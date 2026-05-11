import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly mailService: MailService,
  ) {}

  async processContactForm(createContactDto: CreateContactDto) {
    // Save to database
    const newContact = this.contactRepository.create(createContactDto);
    await this.contactRepository.save(newContact);
    
    // Send email notifications
    void this.mailService.sendContactFormNotification(createContactDto);
    
    return {
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    };
  }
}
