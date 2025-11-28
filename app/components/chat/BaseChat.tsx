/*
 * @ts-nocheck
 * Preventing TS checks with files presented in the video for a better presentation.
 */
import type { JSONValue, Message } from 'ai';
import React, { type RefCallback, useEffect, useState } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { Workbench } from '~/components/workbench/Workbench.client';
import { classNames } from '~/utils/classNames';
import { PROVIDER_LIST, DEFAULT_MODEL, DEFAULT_PROVIDER } from '~/utils/constants';
import { Messages } from './Messages.client';
import { getApiKeysFromCookies } from './APIKeyManager';
import Cookies from 'js-cookie';
import * as Tooltip from '@radix-ui/react-tooltip';
import styles from './BaseChat.module.scss';
 
import type { ProviderInfo } from '~/types/model';
import type { ActionAlert, SupabaseAlert, DeployAlert, LlmErrorAlertType } from '~/types/actions';
import DeployChatAlert from '~/components/deploy/DeployAlert';
import ChatAlert from './ChatAlert';
import type { ModelInfo } from '~/lib/modules/llm/types';
 
import { SupabaseChatAlert } from '~/components/chat/SupabaseAlert';
import { expoUrlAtom } from '~/lib/stores/qrCodeStore';
import { useStore } from '@nanostores/react';
import { StickToBottom, useStickToBottomContext } from '~/lib/hooks';
import { ChatBox } from './ChatBox';
import type { DesignScheme } from '~/types/design-scheme';
import type { ElementInfo } from '~/components/workbench/Inspector';
import LlmErrorAlert from './LLMApiAlert';
import { useLocation } from '@remix-run/react';
import { chatId as chatIdAtom } from '~/lib/persistence/useChatHistory';
import { workbenchStore } from '~/lib/stores/workbench';
import { authStore } from '~/lib/stores/auth';

const TEXTAREA_MIN_HEIGHT = 76;

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
  messageRef?: RefCallback<HTMLDivElement> | undefined;
  scrollRef?: RefCallback<HTMLDivElement> | undefined;
  showChat?: boolean;
  chatStarted?: boolean;
  isStreaming?: boolean;
  onStreamingChange?: (streaming: boolean) => void;
  messages?: Message[];
  description?: string;
  enhancingPrompt?: boolean;
  promptEnhanced?: boolean;
  input?: string;
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  providerList?: ProviderInfo[];
  handleStop?: () => void;
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enhancePrompt?: () => void;
  importChat?: (description: string, messages: Message[]) => Promise<void>;
  exportChat?: () => void;
  uploadedFiles?: File[];
  setUploadedFiles?: (files: File[]) => void;
  imageDataList?: string[];
  setImageDataList?: (dataList: string[]) => void;
  actionAlert?: ActionAlert;
  clearAlert?: () => void;
  supabaseAlert?: SupabaseAlert;
  clearSupabaseAlert?: () => void;
  deployAlert?: DeployAlert;
  clearDeployAlert?: () => void;
  llmErrorAlert?: LlmErrorAlertType;
  clearLlmErrorAlert?: () => void;
  data?: JSONValue[] | undefined;
  chatMode?: 'discuss' | 'build';
  setChatMode?: (mode: 'discuss' | 'build') => void;
  append?: (message: Message) => void;
  designScheme?: DesignScheme;
  setDesignScheme?: (scheme: DesignScheme) => void;
  selectedElement?: ElementInfo | null;
  setSelectedElement?: (element: ElementInfo | null) => void;
  addToolResult?: ({ toolCallId, result }: { toolCallId: string; result: any }) => void;
}

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      onStreamingChange,
      model,
      setModel,
      provider,
      setProvider,
      providerList,
      input = '',
      enhancingPrompt,
      handleInputChange,

      // promptEnhanced,
      enhancePrompt,
      sendMessage,
      handleStop,
      importChat,
      exportChat,
      description,
      uploadedFiles = [],
      setUploadedFiles,
      imageDataList = [],
      setImageDataList,
      messages,
      actionAlert,
      clearAlert,
      deployAlert,
      clearDeployAlert,
      supabaseAlert,
      clearSupabaseAlert,
      llmErrorAlert,
      clearLlmErrorAlert,
      data,
      chatMode,
      setChatMode,
      append,
      designScheme,
      setDesignScheme,
      selectedElement,
      setSelectedElement,
      addToolResult = () => {
        throw new Error('addToolResult not implemented');
      },
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;
    const [apiKeys, setApiKeys] = useState<Record<string, string>>(getApiKeysFromCookies());
    const [modelList, setModelList] = useState<ModelInfo[]>([]);
    const [isModelSettingsCollapsed, setIsModelSettingsCollapsed] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [transcript, setTranscript] = useState('');
    const [isModelLoading, setIsModelLoading] = useState<string | undefined>('all');
    const promptWrapperRef = React.useRef<HTMLDivElement>(null);
    const [promptHeight, setPromptHeight] = useState(0);
    const chatContentRef = React.useRef<HTMLDivElement>(null);
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const [chatLeft, setChatLeft] = useState(0);
    const [chatWidth, setChatWidth] = useState(0);
    const location = typeof window === 'undefined' ? { pathname: '' } : useLocation();
    const isChatRoute = location.pathname.startsWith('/chat');
    const showWorkbench = useStore(workbenchStore.showWorkbench);
    const auth = useStore(authStore);
    const isAuthenticated = auth.isAuthenticated;
    useEffect(() => {
      setProvider?.(DEFAULT_PROVIDER as ProviderInfo);
      setModel?.(DEFAULT_MODEL);
    }, []);
    

    React.useEffect(() => {
      if (!(chatStarted || isChatRoute)) {
        setPromptHeight(0);
        return;
      }

      const el = promptWrapperRef.current;
      if (!el) return;

      const update = () => {
        const h = el.getBoundingClientRect().height || 0;
        setPromptHeight(h);
      };

      update();

      let ro: ResizeObserver | null = null;
      try {
        ro = new ResizeObserver(() => update());
        ro.observe(el);
      } catch {}

      window.addEventListener('resize', update);
      return () => {
        window.removeEventListener('resize', update);
        try {
          ro?.disconnect();
        } catch {}
      };
    }, [chatStarted, isChatRoute]);

  // Track the messages column rect to align the prompt horizontally with it (instead of viewport center)
  React.useEffect(() => {
    if (!(chatStarted || isChatRoute)) {
      setChatLeft(0);
      setChatWidth(0);
      return;
    }

    const el = chatContentRef.current || chatContainerRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setChatLeft(rect.left);
      setChatWidth(rect.width);
    };

    update();

    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    } catch {}

    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      try {
        ro?.disconnect();
      } catch {}
    };
  }, [chatStarted, isChatRoute]);

    const expoUrl = useStore(expoUrlAtom);
    const [qrModalOpen, setQrModalOpen] = useState(false);

    useEffect(() => {
      if (expoUrl) {
        setQrModalOpen(true);
      }
    }, [expoUrl]);

    
    useEffect(() => {
      console.log(transcript);
    }, [transcript]);

    useEffect(() => {
      onStreamingChange?.(isStreaming);
    }, [isStreaming, onStreamingChange]);

    useEffect(() => {
      if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');

          setTranscript(transcript);

          if (handleInputChange) {
            const syntheticEvent = {
              target: { value: transcript },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            handleInputChange(syntheticEvent);
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }, []);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        let parsedApiKeys: Record<string, string> | undefined = {};

        try {
          parsedApiKeys = getApiKeysFromCookies();
          setApiKeys(parsedApiKeys);
        } catch (error) {
          console.error('Error loading API keys from cookies:', error);
          Cookies.remove('apiKeys');
        }

        setIsModelLoading('all');
        fetch('/api/models')
          .then((response) => response.json())
          .then((data) => {
            const typedData = data as { modelList: ModelInfo[] };
            setModelList(typedData.modelList);
          })
          .catch((error) => {
            console.error('Error fetching model list:', error);
          })
          .finally(() => {
            setIsModelLoading(undefined);
          });
      }
    }, [providerList, provider]);

    const onApiKeysChange = async (providerName: string, apiKey: string) => {
      const newApiKeys = { ...apiKeys, [providerName]: apiKey };
      setApiKeys(newApiKeys);
      Cookies.set('apiKeys', JSON.stringify(newApiKeys));

      setIsModelLoading(providerName);

      let providerModels: ModelInfo[] = [];

      try {
        const response = await fetch(`/api/models/${encodeURIComponent(providerName)}`);
        const data = await response.json();
        providerModels = (data as { modelList: ModelInfo[] }).modelList;
      } catch (error) {
        console.error('Error loading dynamic models for:', providerName, error);
      }

      // Only update models for the specific provider
      setModelList((prevModels) => {
        const otherModels = prevModels.filter((model) => model.provider !== providerName);
        return [...otherModels, ...providerModels];
      });
      setIsModelLoading(undefined);
    };

    const startListening = () => {
      if (recognition) {
        recognition.start();
        setIsListening(true);
      }
    };

    const stopListening = () => {
      if (recognition) {
        recognition.stop();
        setIsListening(false);
      }
    };

    const handleSendMessage = (event: React.UIEvent, messageInput?: string) => {
      if (sendMessage) {
        sendMessage(event, messageInput);
        setSelectedElement?.(null);

        if (recognition) {
          recognition.abort(); // Stop current recognition
          setTranscript(''); // Clear transcript
          setIsListening(false);

          // Clear the input by triggering handleInputChange with empty value
          if (handleInputChange) {
            const syntheticEvent = {
              target: { value: '' },
            } as React.ChangeEvent<HTMLTextAreaElement>;
            handleInputChange(syntheticEvent);
          }
        }
      }
    };

    const handleFileUpload = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const base64Image = e.target?.result as string;
            setUploadedFiles?.([...uploadedFiles, file]);
            setImageDataList?.([...imageDataList, base64Image]);
          };
          reader.readAsDataURL(file);

          try {
            const fd = new FormData();
            fd.append('file', file);
            const maybeId = chatIdAtom.get();
            if (maybeId) fd.append('chat_id', maybeId);
            if (description) fd.append('title', description);
            const resp = await fetch('/api.upload', { method: 'POST', body: fd });
            if (resp.ok) {
              const data = (await resp.json()) as { chat_id?: string };
              if (data?.chat_id && data.chat_id !== maybeId) {
                chatIdAtom.set(data.chat_id);
              }
            }
          } catch {}
        }
      };

      input.click();
    };

    const handlePaste = async (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;

      if (!items) {
        return;
      }

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();

          const file = item.getAsFile();

          if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
              const base64Image = e.target?.result as string;
              setUploadedFiles?.([...uploadedFiles, file]);
              setImageDataList?.([...imageDataList, base64Image]);
            };
            reader.readAsDataURL(file);
          }

          break;
        }
      }
    };

    const baseChat = (
      <div
        ref={ref}
        className={classNames(
          styles.BaseChat,
          'flex flex-col flex-1 min-h-0 w-full relative',
        )}
        data-chat-visible={showChat}
      >
        <div className={classNames('flex-1 min-h-0 flex flex-col lg:flex-row w-full', chatStarted ? 'overflow-hidden' : 'overflow-visible')}>
          <div ref={chatContainerRef} className={classNames(styles.Chat, 'flex flex-col flex-grow lg:min-w-[var(--chat-min-width)] min-h-0')}>
            {!chatStarted && !isChatRoute && (
              <div id="intro" className="mt-[12vh] w-full px-4 lg:px-0 pb-24">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className={classNames('text-4xl lg:text-6xl font-extrabold mb-4', styles.IntroTitle)}>
                    <span className="bg-gradient-to-r from-[#a8c0ff] via-[#66ffb2] to-[#c2e9fb] bg-clip-text text-transparent">What will you create with Clyra today?</span>
                  </h1>
                  <p className={classNames('text-base lg:text-xl mb-8 text-white/75', styles.IntroSubtitle)}>
                    Build intelligent apps, websites, and tools with the power of <span className="bg-gradient-to-r from-[#667eea] to-[#66ffb2] bg-clip-text text-transparent font-semibold">AI</span>.
                  </p>
                  {/* Intro composer under tagline */}
                  <div className="max-w-chat mx-auto z-prompt">
                    <ChatBox
                        isModelSettingsCollapsed={isModelSettingsCollapsed}
                        setIsModelSettingsCollapsed={setIsModelSettingsCollapsed}
                        provider={provider}
                        setProvider={setProvider}
                        providerList={providerList || (PROVIDER_LIST as ProviderInfo[])}
                        model={model}
                        setModel={setModel}
                        modelList={modelList}
                        apiKeys={apiKeys}
                        isModelLoading={isModelLoading}
                        onApiKeysChange={onApiKeysChange}
                        uploadedFiles={uploadedFiles}
                        setUploadedFiles={setUploadedFiles}
                        imageDataList={imageDataList}
                        setImageDataList={setImageDataList}
                        textareaRef={textareaRef}
                        input={input}
                        handleInputChange={handleInputChange}
                        handlePaste={handlePaste}
                        TEXTAREA_MIN_HEIGHT={TEXTAREA_MIN_HEIGHT}
                        TEXTAREA_MAX_HEIGHT={TEXTAREA_MAX_HEIGHT}
                        isStreaming={isStreaming}
                        handleStop={handleStop}
                        handleSendMessage={(event, messageInput) => {
                          sendMessage?.(event, messageInput);
                        }}
                        enhancingPrompt={enhancingPrompt}
                        enhancePrompt={enhancePrompt}
                        isListening={isListening}
                        startListening={startListening}
                        stopListening={stopListening}
                        chatStarted={chatStarted}
                        exportChat={exportChat}
                        qrModalOpen={qrModalOpen}
                        setQrModalOpen={setQrModalOpen}
                        handleFileUpload={handleFileUpload}
                        chatMode={chatMode}
                        setChatMode={setChatMode}
                        designScheme={designScheme}
                        setDesignScheme={setDesignScheme}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                        alignLeft
                        disabled={!isAuthenticated}
                      />
                  </div>
                </div>
                {/* Footer removed */}
              </div>
            )}
            {(chatStarted || isChatRoute) && (
              <div 
                className={classNames('relative flex-1 min-h-0 flex flex-col', showWorkbench ? '' : 'w-full')}
                style={showWorkbench ? { width: 'var(--chat-width)', maxWidth: 'var(--chat-width)' } : undefined}
              >
                {/* Semi-circular radial gradient background */}
                <div 
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 110%, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)',
                  }}
                />
                {/* Additional glow layer */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bolt-elements-background-depth-2/40 to-transparent blur-2xl z-0" />

                {/* Scrollable messages area */}
                <StickToBottom
                  className={classNames(
                    'pt-6 relative flex-1 min-h-0 flex flex-col overflow-y-auto overflow-x-hidden modern-scrollbar z-[1]',
                    showWorkbench ? 'pl-2' : 'px-2 sm:px-6'
                  )}
                  style={showWorkbench ? { paddingBottom: '200px', paddingRight: '45px' } : { paddingBottom: '200px' }}
                  resize="smooth"
                  initial="smooth"
                >
                  <StickToBottom.Content
                    className={classNames('flex flex-col gap-4 relative w-full', showWorkbench ? 'items-start' : 'items-center')}
                  >
                    <ClientOnly>
                      {() => {
                        return chatStarted ? (
                          <div ref={chatContentRef} className={classNames(
                            'w-full overflow-hidden',
                            showWorkbench ? 'max-w-full' : 'max-w-chat mx-auto'
                          )}>
                            <Messages
                              className="flex flex-col w-full flex-1 pb-4 z-1"
                              messages={messages}
                              isStreaming={isStreaming}
                              append={append}
                              chatMode={chatMode}
                              setChatMode={setChatMode}
                              provider={provider}
                              model={model}
                              addToolResult={addToolResult}
                            />
                          </div>
                        ) : null;
                      }}
                    </ClientOnly>
                    <ScrollToBottom offset={promptHeight} />
                  </StickToBottom.Content>
                </StickToBottom>

                {/* Fixed chat composer at bottom */}
                <div 
                  className={classNames(
                    'fixed z-10 transition-all duration-300 pointer-events-none',
                    showWorkbench ? 'left-0' : 'left-0 right-0'
                  )}
                  style={{
                    bottom: 0,
                    width: showWorkbench ? 'var(--chat-width)' : '100%',
                    maxWidth: showWorkbench ? 'var(--chat-width)' : '100%',
                  }}
                >
                  <div 
                    className={classNames(
                      'pt-4 pointer-events-auto',
                      showWorkbench ? 'w-full pl-2' : 'w-full max-w-chat mx-auto px-4'
                    )}
                    style={showWorkbench ? { paddingRight: '45px' } : undefined}
                  >
                    {/* Alerts */}
                    <div className="flex flex-col gap-2 mb-2">
                      {deployAlert && (
                        <DeployChatAlert
                          alert={deployAlert}
                          clearAlert={() => clearDeployAlert?.()}
                          postMessage={(message: string | undefined) => {
                            sendMessage?.({} as any, message);
                            clearSupabaseAlert?.();
                          }}
                        />
                      )}
                      {supabaseAlert && (
                        <SupabaseChatAlert
                          alert={supabaseAlert}
                          clearAlert={() => clearSupabaseAlert?.()}
                          postMessage={(message) => {
                            sendMessage?.({} as any, message);
                            clearSupabaseAlert?.();
                          }}
                        />
                      )}
                      {actionAlert && (
                        <ChatAlert
                          alert={actionAlert}
                          clearAlert={() => clearAlert?.()}
                          postMessage={(message) => {
                            sendMessage?.({} as any, message);
                            clearAlert?.();
                          }}
                        />
                      )}
                      {llmErrorAlert && <LlmErrorAlert alert={llmErrorAlert} clearAlert={() => clearLlmErrorAlert?.()} />}
                    </div>
                    
                    {/* Chat input box */}
                    <div ref={promptWrapperRef}>
                      <ChatBox
                          isModelSettingsCollapsed={isModelSettingsCollapsed}
                          setIsModelSettingsCollapsed={setIsModelSettingsCollapsed}
                          provider={provider}
                          setProvider={setProvider}
                          providerList={providerList || (PROVIDER_LIST as ProviderInfo[])}
                          model={model}
                          setModel={setModel}
                          modelList={modelList}
                          apiKeys={apiKeys}
                          isModelLoading={isModelLoading}
                          onApiKeysChange={onApiKeysChange}
                          uploadedFiles={uploadedFiles}
                          setUploadedFiles={setUploadedFiles}
                          imageDataList={imageDataList}
                          setImageDataList={setImageDataList}
                          textareaRef={textareaRef}
                          input={input}
                          handleInputChange={handleInputChange}
                          handlePaste={handlePaste}
                          TEXTAREA_MIN_HEIGHT={TEXTAREA_MIN_HEIGHT}
                          TEXTAREA_MAX_HEIGHT={TEXTAREA_MAX_HEIGHT}
                          isStreaming={isStreaming}
                          handleStop={handleStop}
                          handleSendMessage={(event, messageInput) => {
                            sendMessage?.(event, messageInput);
                          }}
                          enhancingPrompt={enhancingPrompt}
                          enhancePrompt={enhancePrompt}
                          isListening={isListening}
                          startListening={startListening}
                          stopListening={stopListening}
                          chatStarted={chatStarted}
                          exportChat={exportChat}
                          qrModalOpen={qrModalOpen}
                          setQrModalOpen={setQrModalOpen}
                          handleFileUpload={handleFileUpload}
                          chatMode={chatMode}
                          setChatMode={setChatMode}
                          designScheme={designScheme}
                          setDesignScheme={setDesignScheme}
                          selectedElement={selectedElement}
                          setSelectedElement={setSelectedElement}
                          alignLeft={showWorkbench}
                          disabled={!isAuthenticated}
                        />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </div>
          <ClientOnly>
            {() => (
              <Workbench chatStarted={chatStarted} isStreaming={isStreaming} setSelectedElement={setSelectedElement} />
            )}
          </ClientOnly>
        </div>
      </div>
    );

    return <Tooltip.Provider delayDuration={200}>{baseChat}</Tooltip.Provider>;
  },
);

function ScrollToBottom({ offset = 0 }: { offset?: number }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
      <>
        <div
          className="sticky left-0 right-0 bg-gradient-to-t from-bolt-elements-background-depth-1 to-transparent h-20 z-[101]"
          style={{ bottom: offset }}
        />
        <button
          className="sticky z-[101] ml-auto mr-3 sm:mr-6 rounded-full p-2 flex items-center justify-center bg-bolt-elements-background-depth-2 border border-bolt-elements-borderColor text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3"
          style={{ bottom: offset }}
          onClick={() => scrollToBottom()}
          title="Go to last message"
        >
          <span className="i-ph:arrow-down text-xl" />
        </button>
      </>
    )
  );
}
