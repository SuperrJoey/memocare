export interface Memory {
  id: string;
  content: string;
  type: 'arbitrary' | 'relationship' | 'medication' | 'appointment' | 'location';
  timestamp: Date;
  tags: string[];
  addedBy: 'user' | 'caregiver';
  priority: 'low' | 'medium' | 'high';
}

export interface Relationship {
  id: string;
  person1: string;
  person2: string;
  relationship: string;
  timestamp: Date;
}

export interface QueryResult {
  answer: string;
  confidence: number;
  relatedMemories: Memory[];
  timestamp: Date;
}

export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  relationship?: string;
  notes?: string;
}

export interface VoiceState {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
}

export interface AppSettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  voiceEnabled: boolean;
  caregiverMode: boolean;
}