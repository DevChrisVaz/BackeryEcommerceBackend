import Provider from "../../../domain/entities/provider";
import IProviderRepo from "../../../domain/repositories/IProviderRepo";


class CreateProvider {
    private readonly providerRepo: IProviderRepo;

    constructor(providerRepo: IProviderRepo) {
        this.providerRepo = providerRepo;
    }

    async run(provider: Provider): Promise<Provider> {
        const createdProvider: Provider = await this.providerRepo.create(provider);
        return createdProvider;
    }
}

export default CreateProvider;