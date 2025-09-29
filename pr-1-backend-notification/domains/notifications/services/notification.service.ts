import { EmailService } from './email.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/data/database/prisma/service/prisma.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async createNotification(userId: string, pageId: string, type: string) {
    // Create notification in database
    const notification = await this.prisma.supamonitor.notification.create({
      data: {
        userId,
        pageId,
        type,
        status: 'pending'
      }
    });

    // Send email immediately
    this.emailService.sendEmail(userId, notification);
    
    return notification;
  }

  async getNotifications(userId: string) {
    const notifications = await this.prisma.supamonitor.notification.findMany({
      where: { userId: userId }
    });
    
    return notifications;
  }

  async markAsRead(notificationId: string) {
    await this.prisma.supamonitor.notification.update({
      where: { id: notificationId },
      data: { status: 'read' }
    });
  }

  // This runs every hour
  async processNotificationQueue() {
    const pendingNotifications = await this.prisma.supamonitor.notification.findMany({
      where: { status: 'pending' }
    });

    for (const notification of pendingNotifications) {
      try {
        await this.emailService.sendEmail(notification.userId, notification);
        notification.status = 'sent';
        await this.prisma.supamonitor.notification.update({
          where: { id: notification.id },
          data: { status: 'sent' }
        });
      } catch (error) {
        console.log('Failed to send notification:', error);
      }
    }
  }
}