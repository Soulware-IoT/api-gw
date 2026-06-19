import { BadRequestException } from '@nestjs/common';

export abstract class OrganizationIdExtractor {
  protected extractOrganizationId(request: any): string {
    const organizationId =
      request.params?.organizationId ??
      request.query?.organizationId ??
      request.body?.organizationId;

    if (!organizationId) {
      throw new BadRequestException(
        'organizationId is required',
      );
    }

    return organizationId;
  }
}