import { BadRequestException } from '@nestjs/common';
import { translate } from '../i18n/translate';

export abstract class OrganizationIdExtractor {
  protected extractOrganizationId(request: any): string {
    const organizationId =
      request.params?.organizationId ??
      request.query?.organizationId ??
      request.body?.organizationId;

    if (!organizationId) {
      throw new BadRequestException(
        translate('org.id_required', request.headers?.['accept-language']),
      );
    }

    return organizationId;
  }
}