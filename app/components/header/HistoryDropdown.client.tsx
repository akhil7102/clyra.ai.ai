import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChatHistory, db, getAll, deleteById, chatId, type ChatHistoryItem } from '~/lib/persistence';
import { useSearchFilter } from '~/lib/hooks/useSearchFilter';
import { binDates } from '~/components/sidebar/date-binning';
import { HistoryItem } from '~/components/sidebar/HistoryItem';
import { classNames } from '~/utils/classNames';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const HistoryDropdown: React.FC<Props> = ({ open, onClose }) => {
  const { duplicateCurrentChat, exportChat } = useChatHistory();
  const [list, setList] = useState<ChatHistoryItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const { filteredItems: filteredList, handleSearchChange } = useSearchFilter({
    items: list,
    searchFields: ['description'],
  });

  const loadEntries = useCallback(async () => {
    const merged: ChatHistoryItem[] = [];

    // Try remote list first (Supabase via Remix loader)
    try {
      const res = await fetch('/api.chats.list');
      if (res.ok) {
        const data = (await res.json()) as { chats?: Array<{ id: string; title: string; created_at: string }> };
        const remote = (data.chats || []).map((c) => ({
          id: c.id,
          urlId: c.id,
          description: c.title,
          messages: [],
          timestamp: c.created_at,
        })) as ChatHistoryItem[];
        merged.push(...remote);
      }
    } catch {}

    // Merge local DB chats (if available)
    try {
      if (db) {
        const items = await getAll(db).then((items) => items.filter((item) => item.urlId && item.description));
        // Avoid duplicates by id/urlId
        const existing = new Set(merged.map((m) => m.id));
        items.forEach((it) => {
          if (!existing.has(it.id)) {
            merged.push(it);
          }
        });
      }
    } catch {}

    setList(merged);
  }, []);

  useEffect(() => {
    if (open) {
      loadEntries();
    }
  }, [open, loadEntries]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open, onClose]);

  const handleDuplicate = async (id: string) => {
    await duplicateCurrentChat(id);
    loadEntries();
  };

  const handleDelete = async (_event: React.UIEvent, item: ChatHistoryItem) => {
    if (!db) return;
    const ok = window.confirm(`Delete chat: "${item.description}"?`);
    if (!ok) return;
    await deleteById(db, item.id);
    if (chatId.get() === item.id) {
      window.location.pathname = '/';
    }
    loadEntries();
  };

  const grouped = useMemo(() => binDates(filteredList), [filteredList]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className={classNames(
        'absolute right-4 top-[calc(100%+8px)] w-[360px] max-h-[70vh] overflow-auto rounded-2xl',
        'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-accent-100/60 shadow-lg p-2 z-max'
      )}
      role="dialog"
      aria-label="Chat history"
    >
      <div className="px-2 py-1.5">
        <div className="flex gap-2">
          <a
            href="/"
            className="flex-1 flex items-center justify-center rounded-lg px-3 py-1.5 bg-accent-500 text-white hover:bg-accent-600 transition-colors text-sm"
          >
            Start new chat
          </a>
        </div>
        <div className="mt-2 relative">
          <input
            type="search"
            placeholder="Search chats..."
            onChange={handleSearchChange}
            className="w-full bg-white/70 dark:bg-gray-900/70 border border-accent-100/60 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent-500/50"
            aria-label="Search chats"
          />
        </div>
      </div>
      <div className="px-2 pb-2">
        {filteredList.length === 0 && (
          <div className="px-2 py-4 text-sm text-gray-600 dark:text-gray-400">No previous conversations</div>
        )}
        <div className="space-y-2">
          {grouped.map(({ category, items }) => (
            <div key={category} className="space-y-1">
              <div className="sticky top-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                {category}
              </div>
              <div className="space-y-0.5">
                {items.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    exportChat={exportChat}
                    onDelete={(e) => handleDelete(e, item)}
                    onDuplicate={() => handleDuplicate(item.id)}
                    selectionMode={false}
                    isSelected={false}
                    onToggleSelection={() => {}}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
