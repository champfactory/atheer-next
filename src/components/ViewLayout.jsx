export default function ViewLayout({ children, scrollRef }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflow: 'hidden' }}>
      <div ref={scrollRef} style={{ display: 'flex', flexDirection: 'column', flex: '1 1 0%', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
