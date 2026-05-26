export function TableRow({ entry, onDelete }) {
  return (
    <tr>
      <td><TicketLink ticket={entry.ticket} /></td>
      <td><Avatar email={entry.analyst} /></td>
      <td><code>{defang(entry.url)}</code></td>
      <td><StatusPill status={entry.status} /></td>
      <td>{daysSince(entry.added)}d</td>
      <td>{entry.followup || '—'}</td>
      <td><DeleteButton onClick={() => onDelete(entry.id)} /></td>
    </tr>
  );
}
