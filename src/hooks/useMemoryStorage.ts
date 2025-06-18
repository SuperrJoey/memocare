import { useState, useEffect, useCallback } from 'react';
import { Memory, Relationship, Contact, QueryResult } from '../types';

const STORAGE_KEYS = {
  MEMORIES: 'memory-tracker-memories',
  RELATIONSHIPS: 'memory-tracker-relationships',
  CONTACTS: 'memory-tracker-contacts',
  QUERY_CACHE: 'memory-tracker-query-cache'
};

export const useMemoryStorage = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [queryCache, setQueryCache] = useState<Map<string, QueryResult>>(new Map());

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedMemories = localStorage.getItem(STORAGE_KEYS.MEMORIES);
        const storedRelationships = localStorage.getItem(STORAGE_KEYS.RELATIONSHIPS);
        const storedContacts = localStorage.getItem(STORAGE_KEYS.CONTACTS);
        const storedCache = localStorage.getItem(STORAGE_KEYS.QUERY_CACHE);

        if (storedMemories) setMemories(JSON.parse(storedMemories));
        if (storedRelationships) setRelationships(JSON.parse(storedRelationships));
        if (storedContacts) setContacts(JSON.parse(storedContacts));
        if (storedCache) {
          const cacheData = JSON.parse(storedCache);
          setQueryCache(new Map(Object.entries(cacheData)));
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RELATIONSHIPS, JSON.stringify(relationships));
  }, [relationships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const cacheObj = Object.fromEntries(queryCache);
    localStorage.setItem(STORAGE_KEYS.QUERY_CACHE, JSON.stringify(cacheObj));
  }, [queryCache]);

  const addMemory = useCallback((content: string, type: Memory['type'], addedBy: Memory['addedBy'] = 'user', priority: Memory['priority'] = 'medium') => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      content,
      type,
      timestamp: new Date(),
      tags: extractTags(content),
      addedBy,
      priority
    };
    setMemories(prev => [newMemory, ...prev]);
    return newMemory;
  }, []);

  const addRelationship = useCallback((person1: string, person2: string, relationship: string) => {
    const newRelationship: Relationship = {
      id: Date.now().toString(),
      person1,
      person2,
      relationship,
      timestamp: new Date()
    };
    setRelationships(prev => [newRelationship, ...prev]);
    return newRelationship;
  }, []);

  const queryMemories = useCallback((query: string): QueryResult => {
    const cacheKey = query.toLowerCase().trim();
    
    // Check cache first
    if (queryCache.has(cacheKey)) {
      return queryCache.get(cacheKey)!;
    }

    // Simulate NLP processing
    const queryLower = query.toLowerCase();
    let relatedMemories: Memory[] = [];
    let answer = "I couldn't find any specific information about that.";

    // Simple keyword matching for demonstration
    if (queryLower.includes('medicine') || queryLower.includes('medication')) {
      relatedMemories = memories.filter(m => 
        m.content.toLowerCase().includes('medicine') || 
        m.content.toLowerCase().includes('medication') ||
        m.type === 'medication'
      );
      if (relatedMemories.length > 0) {
        const latest = relatedMemories[0];
        answer = `Based on your records: ${latest.content}`;
      } else {
        answer = "I don't have any medication records. Would you like to add one?";
      }
    } else if (queryLower.includes('car') || queryLower.includes('park')) {
      relatedMemories = memories.filter(m => m.content.toLowerCase().includes('car') || m.content.toLowerCase().includes('park'));
      if (relatedMemories.length > 0) {
        answer = `Last parking note: ${relatedMemories[0].content}`;
      }
    } else if (queryLower.includes('brother') || queryLower.includes('sister') || queryLower.includes('family')) {
      const relationshipMatches = relationships.filter(r => 
        r.relationship.toLowerCase().includes('brother') || 
        r.relationship.toLowerCase().includes('sister')
      );
      if (relationshipMatches.length > 0) {
        answer = `Family relationships: ${relationshipMatches.map(r => `${r.person1} is ${r.person2}'s ${r.relationship}`).join(', ')}`;
      }
    } else {
      // General search
      relatedMemories = memories.filter(m => 
        m.content.toLowerCase().includes(queryLower) ||
        m.tags.some(tag => tag.toLowerCase().includes(queryLower))
      );
      if (relatedMemories.length > 0) {
        answer = `Found ${relatedMemories.length} related memories. Most recent: ${relatedMemories[0].content}`;
      }
    }

    const result: QueryResult = {
      answer,
      confidence: relatedMemories.length > 0 ? 0.8 : 0.3,
      relatedMemories,
      timestamp: new Date()
    };

    // Cache the result
    setQueryCache(prev => new Map(prev.set(cacheKey, result)));

    return result;
  }, [memories, relationships, queryCache]);

  const getMemoriesByType = useCallback((type: Memory['type']) => {
    return memories.filter(m => m.type === type);
  }, [memories]);

  return {
    memories,
    relationships,
    contacts,
    addMemory,
    addRelationship,
    queryMemories,
    getMemoriesByType,
    setContacts
  };
};

function extractTags(content: string): string[] {
  const words = content.toLowerCase().split(' ');
  const keywords = ['medicine', 'medication', 'doctor', 'appointment', 'car', 'park', 'home', 'work', 'family', 'friend'];
  return words.filter(word => keywords.includes(word));
}