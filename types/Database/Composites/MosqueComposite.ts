import { Mosque, MosqueService, MosqueSocialMedia } from "..";

export type MosqueComposite = {
  mosque: Mosque;
  services: MosqueService[];
  socialMedias: MosqueSocialMedia[];
};
