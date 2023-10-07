import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  BROKERAGE = "BROKERAGE",
  CREDIT_CARD = "CREDIT_CARD",
  ONLINE = "ONLINE"
}



type EagerTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly description: string;
  readonly amount: number;
  readonly accountID: string;
  readonly Category?: Category | null;
  readonly Account: Account;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly transactionCategoryId?: string | null;
}

type LazyTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date: string;
  readonly description: string;
  readonly amount: number;
  readonly accountID: string;
  readonly Category: AsyncItem<Category | undefined>;
  readonly Account: AsyncItem<Account>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly transactionCategoryId?: string | null;
}

export declare type Transaction = LazyLoading extends LazyLoadingDisabled ? EagerTransaction : LazyTransaction

export declare const Transaction: (new (init: ModelInit<Transaction>) => Transaction) & {
  copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction>) => MutableModel<Transaction> | void): Transaction;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Account, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly startingBalance: number;
  readonly Transactions?: (Transaction | null)[] | null;
  readonly type: AccountType | keyof typeof AccountType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Account, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly startingBalance: number;
  readonly Transactions: AsyncCollection<Transaction>;
  readonly type: AccountType | keyof typeof AccountType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Account = LazyLoading extends LazyLoadingDisabled ? EagerAccount : LazyAccount

export declare const Account: (new (init: ModelInit<Account>) => Account) & {
  copyOf(source: Account, mutator: (draft: MutableModel<Account>) => MutableModel<Account> | void): Account;
}