# PR #1: Add Notification System for Page Updates

**Author:** junior-dev  
**Experience:** 6 months with NestJS
**Branch:** feature/notification-system → main

## Description
I've added a new notification system to alert users when Wikipedia pages they're watching get updated. It supports both email and in-app notifications.

## Changes Made
- Created new notification domain module
- Added email service using nodemailer
- Implemented notification creation and retrieval
- Added cron job for processing notification queue

## Testing
I tested it locally and emails are sending correctly.

## Questions
Is this the right way to structure the domain module? I wasn't sure about the folder organization.