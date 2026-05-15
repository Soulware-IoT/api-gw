import { Injectable, InternalServerErrorException, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, catchError } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class RestaurantService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('RESTAURANT_SERVICE_URL') || 'http://localhost:8080';
  }

  async forwardRequest(method: string, path: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${this.baseUrl}${path}`;
    
    try {
      const response = await lastValueFrom(
        this.httpService.request({
          method,
          url,
          data,
          ...config,
        }).pipe(
          catchError((error) => {
            if (error.response) {
              throw new HttpException(error.response.data, error.response.status);
            }
            throw new InternalServerErrorException('Error al comunicarse con el microservicio Restaurant');
          })
        )
      );
      
      return response.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al procesar la petición al microservicio Restaurant');
    }
  }
}
