import { Mosque, MosqueService, MosqueSocialMedia } from "@/types/Database";
import { MosqueComposite } from "@/types/Database/Composites/MosqueComposite";

export const mockMosques: MosqueComposite[] = [
  {
    mosque: {
      id: "1",
      user_id: "1",
      name: "Mosquée de la Paix",
      picture: null,
      organization_name: "Association Paix",
      address: "123 Rue de la Mosquée",
      city: "Paris",
      zip_code: "75001",
      country: "France",
      latitude: 0,
      longitude: 0,
      phone: "+33 6 23 45 67 89",
      max_capacity: 1000,
      status: "approved",
      supporting_document: "",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as Mosque,
    services: [
      {
        service_name: "ablutions",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueService[],
    socialMedias: [
      {
        platform: "website",
        url: "https://www.mosque.com",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueSocialMedia[],
  },
  {
    mosque: {
      id: "2",
      user_id: "2",
      name: "Mosquée Ennour",
      picture: null,
      organization_name: "Association Ennour",
      address: "45 Avenue des Fleurs",
      city: "Lyon",
      zip_code: "69000",
      country: "France",
      latitude: 0,
      longitude: 0,
      phone: "+33 6 98 76 54 32",
      max_capacity: 800,
      status: "approved",
      supporting_document: "",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as Mosque,
    services: [
      {
        mosque_id: "2",
        service_name: "ablutions",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
      {
        mosque_id: "2",
        service_name: "women_space",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueService[],
    socialMedias: [
      {
        platform: "website",
        url: "https://www.mosque.com",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueSocialMedia[],
  },
  {
    mosque: {
      id: "3",
      user_id: "3",
      name: "Mosquée Al Qods",
      picture: null,
      organization_name: "Association Al Qods",
      address: "78 Boulevard Central",
      city: "Marseille",
      zip_code: "13000",
      country: "France",
      latitude: 0,
      longitude: 0,
      phone: "+33 6 11 22 33 44",
      max_capacity: 1200,
      status: "approved",
      supporting_document: "",
      created_at: "1724832000000",
      updated_at: "1724832000000",
    } as Mosque,
    services: [
      {
        service_name: "ablutions",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
      {
        service_name: "women_space",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueService[],
    socialMedias: [
      {
        platform: "website",
        url: "https://www.mosque.com",
        created_at: "1724832000000",
        updated_at: "1724832000000",
      },
    ] as MosqueSocialMedia[],
  },
];
