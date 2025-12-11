import { type Document, Schema, model, models } from 'mongoose';
import 'server-only';

export interface UserDoc extends Document {
  firstName?: string;
  lastName?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
  phone?: string;
  email: string;
  role: 'user' | 'admin';
  termsAccepted: boolean;
  termsAcceptedAt?: Date;
  passwordHash?: string; // if using credentials; ignore if using OAuth
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
    phone: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => /.+@.+\..+/.test(v),
        message: 'Invalid email address',
      },
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    termsAccepted: { type: Boolean, required: true, default: false },
    termsAcceptedAt: { type: Date },
    passwordHash: { type: String },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

// In dev, Next.js HMR can keep an old compiled model.
// Ensure we re-register the model when schema changes.
if (process.env.NODE_ENV !== 'production' && models.User) {
  delete (models as Record<string, unknown>).User;
}

const User = models.User || model<UserDoc>('User', UserSchema);
export default User;
