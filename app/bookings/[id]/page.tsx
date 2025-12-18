type PageProps = { params: { id: string } };

export default function BookingDetailPage({ params }: PageProps) {
  const { id } = params;
  return (
    <main className='min-h-screen text-inter-sans-serif'>
      {/* TODO: Render booking details for this id */}
      <h1 className='text-quicksand-sans-serif text-2xl font-semibold'>
        Booking details
      </h1>
      <p className='mt-2 text-gray-600'>Booking ID: {id}</p>
    </main>
  );
}
