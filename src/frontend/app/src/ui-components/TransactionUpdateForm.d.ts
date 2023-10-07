/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Transaction, Category as Category0, Account as Account0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TransactionUpdateFormInputValues = {
    date?: string;
    description?: string;
    amount?: number;
    Category?: Category0;
    Account?: Account0;
};
export declare type TransactionUpdateFormValidationValues = {
    date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    Category?: ValidationFunction<Category0>;
    Account?: ValidationFunction<Account0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionUpdateFormOverridesProps = {
    TransactionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    Category?: PrimitiveOverrideProps<AutocompleteProps>;
    Account?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TransactionUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransactionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transaction?: Transaction;
    onSubmit?: (fields: TransactionUpdateFormInputValues) => TransactionUpdateFormInputValues;
    onSuccess?: (fields: TransactionUpdateFormInputValues) => void;
    onError?: (fields: TransactionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionUpdateFormInputValues) => TransactionUpdateFormInputValues;
    onValidate?: TransactionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionUpdateForm(props: TransactionUpdateFormProps): React.ReactElement;
