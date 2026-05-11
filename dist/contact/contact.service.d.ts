import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';
export declare class ContactService {
    private readonly contactRepository;
    private readonly mailService;
    constructor(contactRepository: Repository<Contact>, mailService: MailService);
    processContactForm(createContactDto: CreateContactDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
