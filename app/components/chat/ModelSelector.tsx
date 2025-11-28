import type { ProviderInfo } from '~/types/model';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import type { KeyboardEvent } from 'react';
import type { ModelInfo } from '~/lib/modules/llm/types';
import { classNames } from '~/utils/classNames';
import { DEFAULT_MODEL } from '~/utils/constants';

// Fuzzy search utilities
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
  }

  return matrix[str2.length][str1.length];
};

const fuzzyMatch = (query: string, text: string): { score: number; matches: boolean } => {
  if (!query) {
    return { score: 0, matches: true };
  }

  if (!text) {
    return { score: 0, matches: false };
  }

  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  // Exact substring match gets highest score
  if (textLower.includes(queryLower)) {
    return { score: 100 - (textLower.indexOf(queryLower) / textLower.length) * 20, matches: true };
  }

  // Fuzzy match with reasonable threshold
  const distance = levenshteinDistance(queryLower, textLower);
  const maxLen = Math.max(queryLower.length, textLower.length);
  const similarity = 1 - distance / maxLen;

  return {
    score: similarity > 0.6 ? similarity * 80 : 0,
    matches: similarity > 0.6,
  };
};

const highlightText = (text: string, query: string): string => {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 text-current">$1</mark>');
};

const formatContextSize = (tokens: number): string => {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(1)}M`;
  }

  if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(0)}K`;
  }

  return tokens.toString();
};

interface ModelSelectorProps {
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  modelList: ModelInfo[];
  providerList: ProviderInfo[];
  apiKeys: Record<string, string>;
  modelLoading?: string;
}

// Helper function to determine if a model is likely free
const isModelLikelyFree = (model: ModelInfo, providerName?: string): boolean => {
  // OpenRouter models with zero pricing in the label
  if (providerName === 'OpenRouter' && model.label.includes('in:$0.00') && model.label.includes('out:$0.00')) {
    return true;
  }

  // Models with "free" in the name or label
  if (model.name.toLowerCase().includes('free') || model.label.toLowerCase().includes('free')) {
    return true;
  }

  return false;
};

export const ModelSelector = ({
  model,
  setModel,
  provider,
  setProvider,
  modelList,
  providerList,
  modelLoading,
}: ModelSelectorProps) => {
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [debouncedModelSearchQuery, setDebouncedModelSearchQuery] = useState('');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [focusedModelIndex, setFocusedModelIndex] = useState(-1);
  const modelSearchInputRef = useRef<HTMLInputElement>(null);
  const modelOptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const [providerSearchQuery, setProviderSearchQuery] = useState('');
  const [debouncedProviderSearchQuery, setDebouncedProviderSearchQuery] = useState('');
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [focusedProviderIndex, setFocusedProviderIndex] = useState(-1);
  const providerSearchInputRef = useRef<HTMLInputElement>(null);
  const providerOptionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const providerDropdownRef = useRef<HTMLDivElement>(null);
  const [showFreeModelsOnly, setShowFreeModelsOnly] = useState(false);

  const fallbackModelsByProvider = useMemo<Record<string, ModelInfo[]>>(
    () => ({
      Google: [
        {
          name: 'gemini-2.5-flash',
          label: 'Gemini 2.5 Flash',
          provider: 'Google',
          maxTokenAllowed: 1000000,
          maxCompletionTokens: 8192,
        },
        {
          name: 'gemini-1.5-pro',
          label: 'Gemini 1.5 Pro',
          provider: 'Google',
          maxTokenAllowed: 2000000,
          maxCompletionTokens: 8192,
        },
        {
          name: 'gemini-1.5-flash',
          label: 'Gemini 1.5 Flash',
          provider: 'Google',
          maxTokenAllowed: 1000000,
          maxCompletionTokens: 8192,
        },
      ],
      OpenAI: [
        { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', maxTokenAllowed: 128000, maxCompletionTokens: 4096 },
        {
          name: 'gpt-4o-mini',
          label: 'GPT-4o Mini',
          provider: 'OpenAI',
          maxTokenAllowed: 128000,
          maxCompletionTokens: 4096,
        },
        {
          name: 'gpt-4-turbo',
          label: 'GPT-4 Turbo',
          provider: 'OpenAI',
          maxTokenAllowed: 128000,
          maxCompletionTokens: 4096,
        },
        {
          name: 'gpt-3.5-turbo',
          label: 'GPT-3.5 Turbo',
          provider: 'OpenAI',
          maxTokenAllowed: 16000,
          maxCompletionTokens: 4096,
        },
      ],
      Anthropic: [
        {
          name: 'claude-3-opus-20240229',
          label: 'Claude 3 Opus',
          provider: 'Anthropic',
          maxTokenAllowed: 200000,
          maxCompletionTokens: 128000,
        },
        {
          name: 'claude-3-sonnet-20240229',
          label: 'Claude 3 Sonnet',
          provider: 'Anthropic',
          maxTokenAllowed: 200000,
          maxCompletionTokens: 128000,
        },
        {
          name: 'claude-3-haiku-20240307',
          label: 'Claude 3 Haiku',
          provider: 'Anthropic',
          maxTokenAllowed: 200000,
          maxCompletionTokens: 128000,
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!provider && setProvider && providerList.length > 0) {
      const google = providerList.find((p) => p.name === 'Google');
      setProvider(google || providerList[0]);
    }

    if (!model && setModel) {
      const providerName = (provider && provider.name) || providerList.find((p) => p.name === 'Google')?.name || providerList[0]?.name;
      const staticForProvider = providerList.find((p) => p.name === providerName)?.staticModels || [];
      const fallbackForProvider = fallbackModelsByProvider[providerName || ''] || [];
      const preferredDynamic = modelList.find((m) => m.name === DEFAULT_MODEL && (!providerName || m.provider === providerName));
      const preferredStatic = staticForProvider.find((m) => m.name === DEFAULT_MODEL) || fallbackForProvider.find((m) => m.name === DEFAULT_MODEL);
      const firstDynamic = modelList.find((m) => (!providerName || m.provider === providerName));
      const firstStatic = staticForProvider[0] || fallbackForProvider[0];
      const pick = preferredDynamic || preferredStatic || firstDynamic || firstStatic || modelList[0] || staticForProvider[0] || fallbackForProvider[0];
      if (pick) setModel(pick.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerList, modelList]);

  // Debounce search queries
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedModelSearchQuery(modelSearchQuery);
    }, 150);

    return () => clearTimeout(timer);
  }, [modelSearchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedProviderSearchQuery(providerSearchQuery);
    }, 150);

    return () => clearTimeout(timer);
  }, [providerSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setIsModelDropdownOpen(false);
        setModelSearchQuery('');
      }

      if (providerDropdownRef.current && !providerDropdownRef.current.contains(event.target as Node)) {
        setIsProviderDropdownOpen(false);
        setProviderSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredModels = useMemo(() => {
    const providerStatic = providerList.find((p) => p.name === provider?.name)?.staticModels || [];
    const baseFromDynamic = [...modelList].filter((e) => e.provider === provider?.name && e.name);
    const baseModels = baseFromDynamic.length > 0 ? baseFromDynamic : providerStatic;

    return baseModels
      .filter((model) => {
        // Apply free models filter
        if (showFreeModelsOnly && !isModelLikelyFree(model, provider?.name)) {
          return false;
        }

        return true;
      })
      .map((model) => {
        // Calculate search scores for fuzzy matching
        const labelMatch = fuzzyMatch(debouncedModelSearchQuery, model.label);
        const nameMatch = fuzzyMatch(debouncedModelSearchQuery, model.name);
        const contextMatch = fuzzyMatch(debouncedModelSearchQuery, formatContextSize(model.maxTokenAllowed));

        const bestScore = Math.max(labelMatch.score, nameMatch.score, contextMatch.score);
        const matches = labelMatch.matches || nameMatch.matches || contextMatch.matches || !debouncedModelSearchQuery; // Show all if no query

        return {
          ...model,
          searchScore: bestScore,
          searchMatches: matches,
          highlightedLabel: highlightText(model.label, debouncedModelSearchQuery),
          highlightedName: highlightText(model.name, debouncedModelSearchQuery),
        };
      })
      .filter((model) => model.searchMatches)
      .sort((a, b) => {
        // Sort by search score (highest first), then by label
        if (debouncedModelSearchQuery) {
          return b.searchScore - a.searchScore;
        }

        return a.label.localeCompare(b.label);
      });
  }, [modelList, providerList, provider?.name, showFreeModelsOnly, debouncedModelSearchQuery]);

  const filteredProviders = useMemo(() => {
    if (!debouncedProviderSearchQuery) {
      return providerList;
    }

    return providerList
      .map((provider) => {
        const match = fuzzyMatch(debouncedProviderSearchQuery, provider.name);
        return {
          ...provider,
          searchScore: match.score,
          searchMatches: match.matches,
          highlightedName: highlightText(provider.name, debouncedProviderSearchQuery),
        };
      })
      .filter((provider) => provider.searchMatches)
      .sort((a, b) => b.searchScore - a.searchScore);
  }, [providerList, debouncedProviderSearchQuery]);

  // Reset free models filter when provider changes
  useEffect(() => {
    setShowFreeModelsOnly(false);
  }, [provider?.name]);

  useEffect(() => {
    setFocusedModelIndex(-1);
  }, [debouncedModelSearchQuery, isModelDropdownOpen, showFreeModelsOnly]);

  useEffect(() => {
    setFocusedProviderIndex(-1);
  }, [debouncedProviderSearchQuery, isProviderDropdownOpen]);

  const selectedModelLabel = useMemo(() => {
    const dyn = modelList.find((m) => m.name === model)?.label;
    if (dyn) return dyn;
    const staticForProvider = providerList.find((p) => p.name === provider?.name)?.staticModels || [];
    const stat = staticForProvider.find((m) => m.name === model)?.label;
    if (stat) return stat;
    const fb = (fallbackModelsByProvider[provider?.name || ''] || []).find((m) => m.name === model)?.label;
    return fb;
  }, [model, modelList, providerList, provider?.name, fallbackModelsByProvider]);

  // Clear search functions
  const clearModelSearch = useCallback(() => {
    setModelSearchQuery('');
    setDebouncedModelSearchQuery('');

    if (modelSearchInputRef.current) {
      modelSearchInputRef.current.focus();
    }
  }, []);

  const clearProviderSearch = useCallback(() => {
    setProviderSearchQuery('');
    setDebouncedProviderSearchQuery('');

    if (providerSearchInputRef.current) {
      providerSearchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isModelDropdownOpen && modelSearchInputRef.current) {
      modelSearchInputRef.current.focus();
    }
  }, [isModelDropdownOpen]);

  useEffect(() => {
    if (isProviderDropdownOpen && providerSearchInputRef.current) {
      providerSearchInputRef.current.focus();
    }
  }, [isProviderDropdownOpen]);

  const handleModelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isModelDropdownOpen) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedModelIndex((prev) => (prev + 1 >= filteredModels.length ? 0 : prev + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedModelIndex((prev) => (prev - 1 < 0 ? filteredModels.length - 1 : prev - 1));
        break;
      case 'Enter':
        e.preventDefault();

        if (focusedModelIndex >= 0 && focusedModelIndex < filteredModels.length) {
          const selectedModel = filteredModels[focusedModelIndex];
          setModel?.(selectedModel.name);
          setIsModelDropdownOpen(false);
          setModelSearchQuery('');
          setDebouncedModelSearchQuery('');
        }

        break;
      case 'Escape':
        e.preventDefault();
        setIsModelDropdownOpen(false);
        setModelSearchQuery('');
        setDebouncedModelSearchQuery('');
        break;
      case 'Tab':
        if (!e.shiftKey && focusedModelIndex === filteredModels.length - 1) {
          setIsModelDropdownOpen(false);
        }

        break;
      case 'k':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          clearModelSearch();
        }

        break;
    }
  };

  const handleProviderKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isProviderDropdownOpen) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedProviderIndex((prev) => (prev + 1 >= filteredProviders.length ? 0 : prev + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedProviderIndex((prev) => (prev - 1 < 0 ? filteredProviders.length - 1 : prev - 1));
        break;
      case 'Enter':
        e.preventDefault();

        if (focusedProviderIndex >= 0 && focusedProviderIndex < filteredProviders.length) {
          const selectedProvider = filteredProviders[focusedProviderIndex];
          if (selectedProvider.name !== 'Google') {
            return;
          }

          if (setProvider) {
            setProvider(selectedProvider);

            const firstModel = modelList.find((m) => m.provider === selectedProvider.name);

            if (firstModel && setModel) {
              setModel(firstModel.name);
            }
          }

          setIsProviderDropdownOpen(false);
          setProviderSearchQuery('');
          setDebouncedProviderSearchQuery('');
        }

        break;
      case 'Escape':
        e.preventDefault();
        setIsProviderDropdownOpen(false);
        setProviderSearchQuery('');
        setDebouncedProviderSearchQuery('');
        break;
      case 'Tab':
        if (!e.shiftKey && focusedProviderIndex === filteredProviders.length - 1) {
          setIsProviderDropdownOpen(false);
        }

        break;
      case 'k':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          clearProviderSearch();
        }

        break;
    }
  };

  useEffect(() => {
    if (focusedModelIndex >= 0 && modelOptionsRef.current[focusedModelIndex]) {
      modelOptionsRef.current[focusedModelIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedModelIndex]);

  useEffect(() => {
    if (focusedProviderIndex >= 0 && providerOptionsRef.current[focusedProviderIndex]) {
      providerOptionsRef.current[focusedProviderIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedProviderIndex]);

  useEffect(() => {
    if (providerList.length === 0) {
      return;
    }

    if (provider && !providerList.some((p) => p.name === provider.name)) {
      const firstEnabledProvider = providerList[0];
      setProvider?.(firstEnabledProvider);

      const firstModel = modelList.find((m) => m.provider === firstEnabledProvider.name);

      if (firstModel) {
        setModel?.(firstModel.name);
      }
    }
  }, [providerList, provider, setProvider, modelList, setModel]);

  if (providerList.length === 0) {
    return (
      <div className="mb-2 p-4 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-prompt-background text-bolt-elements-textPrimary">
        <p className="text-center">
          No providers are currently enabled. Please enable at least one provider in the settings to start using the
          chat.
        </p>
      </div>
    );
  }

  // Render: Provider dropdown + model dropdown

  return (
    <div className="flex items-center gap-2 flex-row flex-wrap w-full">
      {/* Provider Combobox */}
      <div
        className="relative flex select-none shrink-0 w-auto"
        onKeyDown={handleProviderKeyDown}
        ref={providerDropdownRef}
      >
        <div
          className={classNames(
            'w-auto h-9 px-3 rounded-lg border transition-all cursor-pointer flex items-center whitespace-nowrap',
            isProviderDropdownOpen ? 'border-cyan-400/50 ring-2 ring-cyan-400/20' : 'border-gray-700/50 hover:border-cyan-400/30',
          )}
          style={{
            background: 'rgba(17, 24, 39, 0.85)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
          }}
          role="combobox"
          aria-expanded={isProviderDropdownOpen}
          aria-controls="provider-listbox"
          aria-haspopup="listbox"
          tabIndex={0}
          onClick={() => setIsProviderDropdownOpen(!isProviderDropdownOpen)}
        >
          <div className="flex items-center gap-2">
            <div className="truncate text-white font-medium">{provider?.name || providerList[0]?.name || 'Provider'}</div>
            <div
              className={classNames(
                'i-ph:caret-down w-4 h-4 text-cyan-400 transition-transform',
                isProviderDropdownOpen ? 'rotate-180' : undefined,
              )}
            />
          </div>
        </div>

        {isProviderDropdownOpen && (
          <div
            className="absolute z-50 w-[260px] mt-1 py-2 rounded-xl shadow-2xl top-full"
            style={{
              background: 'rgba(17, 24, 39, 0.98)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 10px 50px rgba(0, 0, 0, 0.5)',
            }}
            role="listbox"
            id="provider-listbox"
          >

            <div className="max-h-60 overflow-y-auto sm:scrollbar-none">
              {filteredProviders.length === 0 ? (
                <div className="px-3 py-3 text-sm">
                  <div className="text-bolt-elements-textTertiary mb-1">No providers available</div>
                </div>
              ) : (
                filteredProviders.map((p, index) => (
                  <div
                    ref={(el) => (providerOptionsRef.current[index] = el)}
                    key={p.name}
                    role="option"
                    aria-selected={provider?.name === p.name}
                    aria-disabled={p.name !== 'Google'}
                    className={classNames(
                      'px-4 py-2.5 text-sm text-white outline-none transition-all',
                      p.name !== 'Google' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
                    )}
                    onMouseEnter={(e) => {
                      if (p.name !== 'Google') return;
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      if (p.name !== 'Google') return;
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (p.name !== 'Google') return;
                      setProvider?.(p);
                      const dynamicDefault = modelList.find((m) => m.provider === p.name && m.name === DEFAULT_MODEL);
                      const staticDefault = providerList.find((pp) => pp.name === p.name)?.staticModels?.find((m) => m.name === DEFAULT_MODEL);
                      const fallbackDefault = (fallbackModelsByProvider[p.name] || []).find((m) => m.name === DEFAULT_MODEL);
                      const dynamicFirst = modelList.find((m) => m.provider === p.name);
                      const staticFirst = providerList.find((pp) => pp.name === p.name)?.staticModels?.[0];
                      const pick = dynamicDefault || staticDefault || fallbackDefault || dynamicFirst || staticFirst || (fallbackModelsByProvider[p.name] || [])[0];
                      if (pick && setModel) setModel(pick.name);
                      setIsProviderDropdownOpen(false);
                      setProviderSearchQuery('');
                      setDebouncedProviderSearchQuery('');
                    }}
                    tabIndex={focusedProviderIndex === index ? 0 : -1}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="truncate" dangerouslySetInnerHTML={{ __html: (p as any).highlightedName || p.name }} />
                      </div>
                      {p.name !== 'Google' ? (
                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full border border-yellow-400/40 text-yellow-300 bg-yellow-400/10">
                          Coming soon
                        </span>
                      ) : (
                        provider?.name === p.name && (
                          <span className="i-ph:check text-xs text-green-500 ml-2" title="Selected" />
                        )
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Model Combobox (interactive) */}
      <div className="relative flex w-full min-w-0" onKeyDown={handleModelKeyDown} ref={modelDropdownRef}>
        <div
          className={classNames(
            'w-full h-9 px-3 rounded-lg border transition-all cursor-pointer flex items-center',
            isModelDropdownOpen 
              ? 'border-cyan-400/50 ring-2 ring-cyan-400/20' 
              : 'border-gray-700/50 hover:border-cyan-400/30',
          )}
          style={{
            background: 'rgba(17, 24, 39, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsModelDropdownOpen(!isModelDropdownOpen);
            }
          }}
          role="combobox"
          aria-expanded={isModelDropdownOpen}
          aria-controls="model-listbox"
          aria-haspopup="listbox"
          tabIndex={0}
        >
          <div className="flex items-center justify-between">
            <div className="truncate text-white font-medium">{selectedModelLabel || 'Select model'}</div>
            <div
              className={classNames(
                'i-ph:caret-down w-4 h-4 text-cyan-400 transition-transform',
                isModelDropdownOpen ? 'rotate-180' : undefined,
              )}
            />
          </div>
        </div>

        {isModelDropdownOpen && (
          <div
            className="absolute z-50 w-full mt-1 py-2 rounded-xl shadow-2xl top-full"
            style={{
              background: 'rgba(17, 24, 39, 0.98)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.3), 0 10px 50px rgba(0, 0, 0, 0.5)',
            }}
            role="listbox"
            id="model-listbox"
          >

            <div
              className={classNames(
                'max-h-60 overflow-y-auto',
                'sm:scrollbar-none',
                '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2',
                '[&::-webkit-scrollbar-thumb]:bg-bolt-elements-borderColor',
                '[&::-webkit-scrollbar-thumb]:hover:bg-bolt-elements-borderColorHover',
                '[&::-webkit-scrollbar-thumb]:rounded-full',
                '[&::-webkit-scrollbar-track]:bg-bolt-elements-background-depth-2',
                '[&::-webkit-scrollbar-track]:rounded-full',
                'sm:[&::-webkit-scrollbar]:w-1.5 sm:[&::-webkit-scrollbar]:h-1.5',
                'sm:hover:[&::-webkit-scrollbar-thumb]:bg-bolt-elements-borderColor/50',
                'sm:hover:[&::-webkit-scrollbar-thumb:hover]:bg-bolt-elements-borderColor',
                'sm:[&::-webkit-scrollbar-track]:bg-transparent',
              )}
            >
              {modelLoading === 'all' || modelLoading === provider?.name ? (
                <div className="px-3 py-3 text-sm">
                  <div className="flex items-center gap-2 text-bolt-elements-textTertiary">
                    <span className="i-ph:spinner animate-spin" />
                    Loading models...
                  </div>
                </div>
              ) : filteredModels.length === 0 ? (
                <div className="px-3 py-3 text-sm">
                  <div className="text-bolt-elements-textTertiary mb-1">
                    {debouncedModelSearchQuery ? `No models match "${debouncedModelSearchQuery}"` : 'No models available'}
                  </div>
                </div>
              ) : (
                filteredModels.map((modelOption, index) => (
                  <div
                    ref={(el) => (modelOptionsRef.current[index] = el)}
                    key={modelOption.name}
                    role="option"
                    aria-selected={model === modelOption.name}
                    className={classNames(
                      'px-4 py-2.5 text-sm cursor-pointer',
                      'text-white',
                      'outline-none transition-all',
                    )}
                    style={{
                      background: model === modelOption.name || focusedModelIndex === index
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = model === modelOption.name || focusedModelIndex === index
                        ? 'rgba(59, 130, 246, 0.15)'
                        : 'transparent';
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModel?.(modelOption.name);
                      setIsModelDropdownOpen(false);
                      setModelSearchQuery('');
                      setDebouncedModelSearchQuery('');
                    }}
                    tabIndex={focusedModelIndex === index ? 0 : -1}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="truncate">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: (modelOption as any).highlightedLabel || modelOption.label,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-bolt-elements-textTertiary">
                            {formatContextSize(modelOption.maxTokenAllowed)} tokens
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {model === modelOption.name && (
                          <span className="i-ph:check text-xs text-green-500" title="Selected" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
;
