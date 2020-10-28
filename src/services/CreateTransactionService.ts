import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { response } from 'express';

interface Request {
  title: string;
  value: 3000;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if(!["income", "outcome"].includes(type)) {
      throw new Error("Invalid type");
    }

    const { total } = this.transactionsRepository.getBalance();    
    if(type == "outcome" && value > total) {
      throw new Error("Should not be able to create outcome transaction without a valid balance")
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
