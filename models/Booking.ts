import mongoose, { type Document, Schema, model, models } from 'mongoose';
import 'server-only';

export interface BookingDoc extends Document {
  user?: mongoose.Types.ObjectId;
  heal: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  phone?: string;
  email?: string;
  scheduledAt: Date;
  mode: 'onsite' | 'online';
  termsAccepted: boolean;
  termsAcceptedAt?: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    heal: { type: Schema.Types.ObjectId, ref: 'Heal', required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    phone: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) => (v ? /.+@.+\..+/.test(v) : true),
        message: 'Invalid email address',
      },
    },
    scheduledAt: { type: Date, required: true },
    mode: {
      type: String,
      required: true,
      enum: ['onsite', 'online'],
    },
    termsAccepted: { type: Boolean, required: true, default: false },
    termsAcceptedAt: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model<BookingDoc>('Booking', BookingSchema);
export default Booking;
