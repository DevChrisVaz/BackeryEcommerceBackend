import Provider from "../entities/provider";


interface IProviderRepo {
    getAll(): Promise<Provider[]>;
    getById(id: string): Promise<Provider | null>;
    create(provider: Provider): Promise<Provider>;
    update(provider: Provider): Promise<Provider | null>;
    delete(provider: Provider): Promise<Provider | null>;
}

export default IProviderRepo;