import { BadRequestException } from '@nestjs/common';

export abstract class OrganizationIdExtractor {
  protected extractOrganizationId(request: any): string {
    const method = request.method.toUpperCase();

    const organizationId =
      method === 'GET' || method === 'DELETE'
        ? request.params?.organizationId ?? request.query?.organizationId
        : request.body?.organizationId;

    console.log(`[OrganizationIdExtractor] method=${method} params=${JSON.stringify(request.params)} query=${JSON.stringify(request.query)} body=${JSON.stringify(request.body)} → organizationId=${organizationId}`);

    if (!organizationId) {
      throw new BadRequestException(
        'organizationId is required',
      );
    }

    return organizationId;
  }
}