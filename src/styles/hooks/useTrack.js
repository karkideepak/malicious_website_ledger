export function useTracker() {
  const [entries, setEntries] = useLocalStorage('tracker-entries', SEED_ENTRIES);
  const [query, setQuery] = useState('');

  const add    = (entry) => setEntries(prev => [...prev, { ...entry, id: Date.now(), added: new Date() }]);
  const remove = (id)    => setEntries(prev => prev.filter(e => e.id !== id));
  const filtered = entries.filter(e => matchesQuery(e, query));

  return { entries, filtered, query, setQuery, add, remove };
}
