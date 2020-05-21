import { Controller, Get, Query } from '@nestjs/common';

const QRCode = require('qrcode');

@Controller('qr')
export default class QrCodeController {
  @Get('qrCode.png')
  generate(@Query("params") params: string) {
    return QRCode.toDataURL(params, {
      width: 300,
      margin: 3,
      color: {
        dark: '#0b303d'
      }
    });
  }
}
