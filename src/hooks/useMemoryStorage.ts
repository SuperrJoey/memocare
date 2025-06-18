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
      tags: extractTags(content, type),
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

    const queryLower = query.toLowerCase();
    let relatedMemories: Memory[] = [];
    let answer = "I couldn't find any specific information about that.";
    let confidence = 0.3;

    // Enhanced semantic matching
    const queryIntent = analyzeQueryIntent(queryLower);
    
    switch (queryIntent.type) {
      case 'appointment':
        relatedMemories = memories.filter(m => 
          m.type === 'appointment' ||
          m.content.toLowerCase().includes('appointment') ||
          m.content.toLowerCase().includes('meeting') ||
          m.content.toLowerCase().includes('meet') ||
          m.tags.includes('appointment') ||
          m.tags.includes('meeting')
        );
        
        if (relatedMemories.length > 0) {
          const sortedByDate = relatedMemories.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          if (queryIntent.timeframe === 'today') {
            const today = new Date().toDateString();
            const todayAppointments = sortedByDate.filter(m => 
              new Date(m.timestamp).toDateString() === today ||
              m.content.toLowerCase().includes('today')
            );
            
            if (todayAppointments.length > 0) {
              answer = `Today's appointments: ${todayAppointments.map(m => m.content).join('; ')}`;
              relatedMemories = todayAppointments;
            } else {
              answer = `No appointments found for today. Your recent appointments: ${sortedByDate.slice(0, 2).map(m => m.content).join('; ')}`;
            }
          } else {
            answer = `Your appointments: ${sortedByDate.slice(0, 3).map(m => m.content).join('; ')}`;
          }
          confidence = 0.9;
        } else {
          answer = "I don't have any appointment records. Would you like to add one?";
        }
        break;

      case 'medication':
        relatedMemories = memories.filter(m => 
          m.type === 'medication' ||
          m.content.toLowerCase().includes('medicine') ||
          m.content.toLowerCase().includes('medication') ||
          m.content.toLowerCase().includes('pill') ||
          m.content.toLowerCase().includes('drug') ||
          m.tags.includes('medicine') ||
          m.tags.includes('medication')
        );
        
        if (relatedMemories.length > 0) {
          const latest = relatedMemories[0];
          if (queryIntent.timeframe === 'today') {
            const today = new Date().toDateString();
            const todayMeds = relatedMemories.filter(m => 
              new Date(m.timestamp).toDateString() === today ||
              m.content.toLowerCase().includes('today')
            );
            
            if (todayMeds.length > 0) {
              answer = `Today's medication: ${todayMeds[0].content}`;
              relatedMemories = todayMeds;
            } else {
              answer = `No medication recorded for today. Last record: ${latest.content}`;
            }
          } else {
            answer = `Latest medication record: ${latest.content}`;
          }
          confidence = 0.9;
        } else {
          answer = "I don't have any medication records. Would you like to add one?";
        }
        break;

      case 'location':
        relatedMemories = memories.filter(m => 
          m.type === 'location' ||
          m.content.toLowerCase().includes('park') ||
          m.content.toLowerCase().includes('car') ||
          m.content.toLowerCase().includes('left') ||
          m.content.toLowerCase().includes('placed') ||
          m.content.toLowerCase().includes('put') ||
          m.tags.includes('location') ||
          m.tags.includes('parking')
        );
        
        if (relatedMemories.length > 0) {
          answer = `Location info: ${relatedMemories[0].content}`;
          confidence = 0.8;
        }
        break;

      case 'relationship':
        const relationshipMatches = relationships.filter(r => 
          r.relationship.toLowerCase().includes(queryIntent.relationshipType || '') ||
          r.person1.toLowerCase().includes(queryIntent.person || '') ||
          r.person2.toLowerCase().includes(queryIntent.person || '')
        );
        
        if (relationshipMatches.length > 0) {
          answer = `Relationships: ${relationshipMatches.map(r => 
            `${r.person1} is ${r.person2}'s ${r.relationship}`
          ).join(', ')}`;
          confidence = 0.9;
        }
        break;

      case 'schedule':
        const scheduleMemories = memories.filter(m => 
          m.type === 'appointment' ||
          m.content.toLowerCase().includes('schedule') ||
          m.content.toLowerCase().includes('today') ||
          m.content.toLowerCase().includes('tomorrow') ||
          m.tags.includes('schedule')
        );
        
        if (scheduleMemories.length > 0) {
          answer = `Your schedule: ${scheduleMemories.slice(0, 3).map(m => m.content).join('; ')}`;
          relatedMemories = scheduleMemories;
          confidence = 0.8;
        }
        break;

      default:
        // Enhanced general search with better semantic matching
        const searchTerms = extractSearchTerms(queryLower);
        relatedMemories = memories.filter(m => {
          const contentLower = m.content.toLowerCase();
          const typeMatch = m.type.toLowerCase().includes(queryLower);
          const contentMatch = searchTerms.some(term => contentLower.includes(term));
          const tagMatch = m.tags.some(tag => 
            searchTerms.some(term => tag.toLowerCase().includes(term))
          );
          
          return typeMatch || contentMatch || tagMatch;
        });
        
        if (relatedMemories.length > 0) {
          const sortedMemories = relatedMemories.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          answer = `Found ${relatedMemories.length} related memories. Most recent: ${sortedMemories[0].content}`;
          confidence = 0.7;
        }
    }

    const result: QueryResult = {
      answer,
      confidence,
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

function extractTags(content: string, type: Memory['type']): string[] {
  const contentLower = content.toLowerCase();
  const tags: string[] = [];
  
  // Add type-specific tags
  tags.push(type);
  
  // Enhanced keyword extraction based on content and type
  const keywordMap = {
    medication: ['medicine', 'medication', 'pill', 'drug', 'dose', 'tablet', 'took', 'take'],
    appointment: ['appointment', 'meeting', 'meet', 'doctor', 'dentist', 'visit', 'scheduled'],
    location: ['park', 'parked', 'car', 'left', 'placed', 'put', 'location', 'lot', 'garage'],
    relationship: ['brother', 'sister', 'mother', 'father', 'friend', 'family', 'relative'],
    arbitrary: ['remember', 'note', 'important', 'remind']
  };
  
  // Add semantic tags based on content
  Object.entries(keywordMap).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        tags.push(keyword);
        if (category !== type) {
          tags.push(category);
        }
      }
    });
  });
  
  // Extract time-related tags
  const timeKeywords = ['today', 'tomorrow', 'yesterday', 'morning', 'afternoon', 'evening', 'night'];
  timeKeywords.forEach(timeWord => {
    if (contentLower.includes(timeWord)) {
      tags.push(timeWord);
    }
  });
  
  // Extract names (simple heuristic - capitalized words)
  const words = content.split(' ');
  words.forEach(word => {
    if (word.length > 2 && word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()) {
      tags.push(word.toLowerCase());
    }
  });
  
  return [...new Set(tags)]; // Remove duplicates
}

function analyzeQueryIntent(query: string) {
  const intent = {
    type: 'general',
    timeframe: null as string | null,
    person: null as string | null,
    relationshipType: null as string | null
  };
  
  // Appointment/Meeting intent
  if (query.includes('appointment') || query.includes('meeting') || query.includes('meet') || 
      query.includes('schedule') || query.includes('visit')) {
    intent.type = 'appointment';
  }
  
  // Medication intent
  else if (query.includes('medicine') || query.includes('medication') || query.includes('pill') || 
           query.includes('drug') || query.includes('took') || query.includes('take')) {
    intent.type = 'medication';
  }
  
  // Location intent
  else if (query.includes('park') || query.includes('car') || query.includes('where') || 
           query.includes('left') || query.includes('placed')) {
    intent.type = 'location';
  }
  
  // Schedule intent
  else if (query.includes('schedule') || query.includes('today') || query.includes('tomorrow')) {
    intent.type = 'schedule';
  }
  
  // Relationship intent
  else if (query.includes('brother') || query.includes('sister') || query.includes('mother') || 
           query.includes('father') || query.includes('family') || query.includes('who is')) {
    intent.type = 'relationship';
  }
  
  // Extract timeframe
  if (query.includes('today')) intent.timeframe = 'today';
  else if (query.includes('tomorrow')) intent.timeframe = 'tomorrow';
  else if (query.includes('yesterday')) intent.timeframe = 'yesterday';
  
  // Extract relationship types
  const relationshipTypes = ['brother', 'sister', 'mother', 'father', 'friend', 'cousin'];
  relationshipTypes.forEach(rel => {
    if (query.includes(rel)) {
      intent.relationshipType = rel;
    }
  });
  
  return intent;
}

function extractSearchTerms(query: string): string[] {
  // Remove common stop words and extract meaningful terms
  const stopWords = ['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by'];
  const words = query.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  return words;
}