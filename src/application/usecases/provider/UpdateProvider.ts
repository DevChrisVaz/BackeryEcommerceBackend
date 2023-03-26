import Provider from "../../../domain/entities/provider";
import IProviderRepo from "../../../domain/repositories/IProviderRepo";
import GetProviderById from "./GetProviderById";

class UpdateProvider {
    private readonly providerRepo: IProviderRepo;
    private readonly getProviderById: GetProviderById;

    constructor(providerRepo: IProviderRepo) {
        this.providerRepo = providerRepo;
        this.getProviderById = new GetProviderById(providerRepo);
    }

    async run(provider: Provider): Promise<Provider | null> {
        const foundProvider: Provider | null = await this.getProviderById.run(provider.uuid ?? "");

        if (foundProvider) {
            const providerToUpdate: Provider = {
                ...foundProvider,
                fullName: provider.fullName ?? foundProvider.fullName,
                phone: provider.phone ?? foundProvider.phone
            }

            const updatedProvider: Provider | null = await this.providerRepo.update(providerToUpdate);

            return updatedProvider;
        }

        return null;
    }
}

export default UpdateProvider;