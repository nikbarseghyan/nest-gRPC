import { Controller, OnModuleInit, Post, Logger, Body } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
// import { AppService } from './app.service';
import { microserviceOptions } from './config/gRPC.configuration';
import { IGrpcService } from './interface/gRPC.interface';

@Controller()
export class AppController implements OnModuleInit {
    private logger = new Logger('AppController');

    @Client(microserviceOptions)
    private client: ClientGrpc;

    private grpcService: IGrpcService;

    // constructor(private readonly appService: AppService) {}

    onModuleInit() {
        this.grpcService = this.client.getService<IGrpcService>('AppController');
    }

    @Post('add')
    async accumulate(@Body('data') data: number[]) {
        this.logger.log(`Adding ${data.toString()}`);
        return this.grpcService.accumulate({ data });
    }
}
