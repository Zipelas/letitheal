export default function Loading() {
  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <div className='animate-pulse'>
          <div className='h-7 w-48 bg-(--muted) rounded mb-4' />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='h-20 bg-(--muted) rounded' />
            <div className='h-20 bg-(--muted) rounded' />
            <div className='h-20 bg-(--muted) rounded' />
            <div className='h-20 bg-(--muted) rounded' />
          </div>
        </div>
      </section>
    </main>
  );
}
