import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async processContactForm(createContactDto: CreateContactDto) {
    // Here you could also save the message to a database if desired
    
    // Send email notifications
    await this.mailService.sendContactFormNotification(createContactDto);
    
    return {
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    };
  }
}
