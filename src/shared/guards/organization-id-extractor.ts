import { BadRequestException } from '@nestjs/common';

export abstract class OrganizationIdExtractor {
  protected extractOrganizationId(request: any): string {
    const method = request.method.toUpperCase();

    const organizationId =
      method === 'GET' || method === 'DELETE'
        ? request.params?.organizationId
        : request.body?.organizationId;

    if (!organizationId) {
      throw new BadRequestException(
        'organizationId is required',
      );
    }

    return organizationId;
  }
}