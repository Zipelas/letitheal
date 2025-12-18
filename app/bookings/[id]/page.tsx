type PageProps = { params: { id: string } };

export default function BookingDetailPage({ params }: PageProps) {
  const { id } = params;
  return (
    <main className='min-h-screen'>
      {/* TODO: Render booking details for this id */}
      <h1 className='text-2xl font-semibold'>Booking details</h1>
      <p className='mt-2 text-gray-600'>Booking ID: {id}</p>
    </main>
  );
}
