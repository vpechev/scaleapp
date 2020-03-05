// import { MongoAdapter } from './mongoAdapter';
import { Area } from '../models/area.model';
import { BaseFileRepository } from './baseFileRepository'
import { ConfigService } from '../services/configService';

export class AreaRepository extends BaseFileRepository<Area> {
    constructor(configService: ConfigService) { 
        super(configService.getAreasSchemaPathConfig());
    }
}