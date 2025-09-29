import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { JwtGuard } from '@/domains/authentication/guards/jwt.guard';

@Controller('notifications')
@UseGuards(JwtGuard)
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async create(@Body() body: any) {
    return this.notificationService.createNotification(
      body.userId,
      body.pageId,
      body.type
    );
  }

  @Get(':userId')
  async getAll(@Param('userId') userId: string) {
    return this.notificationService.getNotifications(userId);
  }

  @Post(':id/read')
  async markRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(id);
  }
}