export interface PetType {
  id: string;
  name: string;
  created_at: string;
}

export interface Size {
  id: string;
  name: string;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  created_at: string;
}

export interface Personality {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export type CatalogType = 'pet_types' | 'sizes' | 'locations' | 'personalities';

export interface CatalogItem {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
}