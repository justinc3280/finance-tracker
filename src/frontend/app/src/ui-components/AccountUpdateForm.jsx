/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Account, Transaction } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function AccountUpdateForm(props) {
  const {
    id: idProp,
    account: accountModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    startingBalance: "",
    Transactions: [],
    type: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [startingBalance, setStartingBalance] = React.useState(
    initialValues.startingBalance
  );
  const [Transactions, setTransactions] = React.useState(
    initialValues.Transactions
  );
  const [type, setType] = React.useState(initialValues.type);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = accountRecord
      ? { ...initialValues, ...accountRecord, Transactions: linkedTransactions }
      : initialValues;
    setName(cleanValues.name);
    setStartingBalance(cleanValues.startingBalance);
    setTransactions(cleanValues.Transactions ?? []);
    setCurrentTransactionsValue(undefined);
    setCurrentTransactionsDisplayValue("");
    setType(cleanValues.type);
    setErrors({});
  };
  const [accountRecord, setAccountRecord] = React.useState(accountModelProp);
  const [linkedTransactions, setLinkedTransactions] = React.useState([]);
  const canUnlinkTransactions = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Account, idProp)
        : accountModelProp;
      setAccountRecord(record);
      const linkedTransactions = record
        ? await record.Transactions.toArray()
        : [];
      setLinkedTransactions(linkedTransactions);
    };
    queryData();
  }, [idProp, accountModelProp]);
  React.useEffect(resetStateValues, [accountRecord, linkedTransactions]);
  const [currentTransactionsDisplayValue, setCurrentTransactionsDisplayValue] =
    React.useState("");
  const [currentTransactionsValue, setCurrentTransactionsValue] =
    React.useState(undefined);
  const TransactionsRef = React.createRef();
  const getIDValue = {
    Transactions: (r) => JSON.stringify({ id: r?.id }),
  };
  const TransactionsIdSet = new Set(
    Array.isArray(Transactions)
      ? Transactions.map((r) => getIDValue.Transactions?.(r))
      : getIDValue.Transactions?.(Transactions)
  );
  const transactionRecords = useDataStoreBinding({
    type: "collection",
    model: Transaction,
  }).items;
  const getDisplayValue = {
    Transactions: (r) =>
      `${r?.description ? r?.description + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    startingBalance: [{ type: "Required" }],
    Transactions: [],
    type: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          startingBalance,
          Transactions,
          type,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const promises = [];
          const transactionsToLink = [];
          const transactionsToUnLink = [];
          const transactionsSet = new Set();
          const linkedTransactionsSet = new Set();
          Transactions.forEach((r) =>
            transactionsSet.add(getIDValue.Transactions?.(r))
          );
          linkedTransactions.forEach((r) =>
            linkedTransactionsSet.add(getIDValue.Transactions?.(r))
          );
          linkedTransactions.forEach((r) => {
            if (!transactionsSet.has(getIDValue.Transactions?.(r))) {
              transactionsToUnLink.push(r);
            }
          });
          Transactions.forEach((r) => {
            if (!linkedTransactionsSet.has(getIDValue.Transactions?.(r))) {
              transactionsToLink.push(r);
            }
          });
          transactionsToUnLink.forEach((original) => {
            if (!canUnlinkTransactions) {
              throw Error(
                `Transaction ${original.id} cannot be unlinked from Account because undefined is a required field.`
              );
            }
            promises.push(
              DataStore.save(
                Transaction.copyOf(original, (updated) => {
                  updated.Account = null;
                })
              )
            );
          });
          transactionsToLink.forEach((original) => {
            promises.push(
              DataStore.save(
                Transaction.copyOf(original, (updated) => {
                  updated.Account = accountRecord;
                })
              )
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            startingBalance: modelFields.startingBalance,
            type: modelFields.type,
          };
          promises.push(
            DataStore.save(
              Account.copyOf(accountRecord, (updated) => {
                Object.assign(updated, modelFieldsToSave);
              })
            )
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "AccountUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              startingBalance,
              Transactions,
              type,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Starting balance"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={startingBalance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              startingBalance: value,
              Transactions,
              type,
            };
            const result = onChange(modelFields);
            value = result?.startingBalance ?? value;
          }
          if (errors.startingBalance?.hasError) {
            runValidationTasks("startingBalance", value);
          }
          setStartingBalance(value);
        }}
        onBlur={() => runValidationTasks("startingBalance", startingBalance)}
        errorMessage={errors.startingBalance?.errorMessage}
        hasError={errors.startingBalance?.hasError}
        {...getOverrideProps(overrides, "startingBalance")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              startingBalance,
              Transactions: values,
              type,
            };
            const result = onChange(modelFields);
            values = result?.Transactions ?? values;
          }
          setTransactions(values);
          setCurrentTransactionsValue(undefined);
          setCurrentTransactionsDisplayValue("");
        }}
        currentFieldValue={currentTransactionsValue}
        label={"Transactions"}
        items={Transactions}
        hasError={errors?.Transactions?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Transactions", currentTransactionsValue)
        }
        errorMessage={errors?.Transactions?.errorMessage}
        getBadgeText={getDisplayValue.Transactions}
        setFieldValue={(model) => {
          setCurrentTransactionsDisplayValue(
            model ? getDisplayValue.Transactions(model) : ""
          );
          setCurrentTransactionsValue(model);
        }}
        inputFieldRef={TransactionsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Transactions"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Transaction"
          value={currentTransactionsDisplayValue}
          options={transactionRecords
            .filter((r) => !TransactionsIdSet.has(getIDValue.Transactions?.(r)))
            .map((r) => ({
              id: getIDValue.Transactions?.(r),
              label: getDisplayValue.Transactions?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentTransactionsValue(
              transactionRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentTransactionsDisplayValue(label);
            runValidationTasks("Transactions", label);
          }}
          onClear={() => {
            setCurrentTransactionsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Transactions?.hasError) {
              runValidationTasks("Transactions", value);
            }
            setCurrentTransactionsDisplayValue(value);
            setCurrentTransactionsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Transactions", currentTransactionsDisplayValue)
          }
          errorMessage={errors.Transactions?.errorMessage}
          hasError={errors.Transactions?.hasError}
          ref={TransactionsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Transactions")}
        ></Autocomplete>
      </ArrayField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              startingBalance,
              Transactions,
              type: value,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="Checking"
          value="CHECKING"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Savings"
          value="SAVINGS"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="Brokerage"
          value="BROKERAGE"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
        <option
          children="Credit card"
          value="CREDIT_CARD"
          {...getOverrideProps(overrides, "typeoption3")}
        ></option>
        <option
          children="Online"
          value="ONLINE"
          {...getOverrideProps(overrides, "typeoption4")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || accountModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || accountModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
