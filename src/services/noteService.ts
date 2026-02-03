import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: "created" | "updated";
}


export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const { page, perPage, search, tag, sortBy } = params;
  const query: Record<string, string | number> = {
    page,
    perPage,
  };
  if (search && search.trim().length > 0) {
    query.search = search.trim();
  }
  if (tag) {
    query.tag = tag;
  }
  if (sortBy) {
    query.sortBy = sortBy;
  }
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: query,
  });
  return response.data;
};


export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}


export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};


export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};