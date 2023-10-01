/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Category as Category0 } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TransactionCreateFormInputValues = {
    date?: string;
    description?: string;
    amount?: number;
    accountID?: string;
    Category?: Category0;
};
export declare type TransactionCreateFormValidationValues = {
    date?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    accountID?: ValidationFunction<string>;
    Category?: ValidationFunction<Category0>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionCreateFormOverridesProps = {
    TransactionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    accountID?: PrimitiveOverrideProps<AutocompleteProps>;
    Category?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type TransactionCreateFormProps = React.PropsWithChildren<{
    overrides?: TransactionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TransactionCreateFormInputValues) => TransactionCreateFormInputValues;
    onSuccess?: (fields: TransactionCreateFormInputValues) => void;
    onError?: (fields: TransactionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionCreateFormInputValues) => TransactionCreateFormInputValues;
    onValidate?: TransactionCreateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionCreateForm(props: TransactionCreateFormProps): React.ReactElement;
