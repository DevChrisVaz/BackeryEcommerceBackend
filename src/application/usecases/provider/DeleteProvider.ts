import Provider from "../../../domain/entities/provider";
import IProviderRepo from "../../../domain/repositories/IProviderRepo";

class DeleteProvider {
    private readonly providerRepo: IProviderRepo;

    constructor(providerRepo: IProviderRepo) {
        this.providerRepo = providerRepo;
    }

    async run(id: string): Promise<Provider | null> {
        const foundProvider: Provider | null = await this.providerRepo.getById(id);

        if(foundProvider) {
            return await this.providerRepo.delete(foundProvider);
        }

        return null;
    }
}

export default DeleteProvider;