// import { MongoAdapter } from './mongoAdapter';
import { Complexity } from '../models/complexity.model';
import { BaseFileRepository } from './baseFileRepository';
import { ConfigService } from '../services/configService';

export class ComplexityRepository extends BaseFileRepository<Complexity> {
    constructor(configService: ConfigService) { 
        super(configService.getComplexitiesSchemaPathConfig());
    }
}