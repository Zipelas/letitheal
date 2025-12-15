import { Document, Schema, model, models } from 'mongoose';
import 'server-only';

export interface HealDoc extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  imageUrl: string;
  location: string;
  date: string;
  time: string;
  price: number;
  mode: string;
  tags: string[];
}

const HealSchema = new Schema<HealDoc>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [120, 'Slug cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      maxlength: [500, 'Overview cannot exceed 500 characters'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
    },
    price: {
      type: Number,
      min: 0,
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: {
        values: ['onsite', 'online', 'hybrid'],
        message: 'Mode must be either onsite, online or hybrid',
      },
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one tag is required',
      },
    },
  },
  { timestamps: true }
);

// In dev, Next.js HMR can keep an old compiled model with an outdated schema.
// Ensure we re-register the model when schema changes.
if (process.env.NODE_ENV !== 'production' && models.Heal) {
  delete (models as Record<string, unknown>).Heal;
}

const Heal = models.Heal || model<HealDoc>('Heal', HealSchema);
export default Heal;
