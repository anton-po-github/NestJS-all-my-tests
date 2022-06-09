import { Model } from 'mongoose';
import { Cat, CatDocument } from 'src/schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
export declare class CatsService {
    private catModel;
    constructor(catModel: Model<CatDocument>);
    create(createCatDto: CreateCatDto): Promise<Cat>;
    findAll(): Promise<Cat[]>;
}
