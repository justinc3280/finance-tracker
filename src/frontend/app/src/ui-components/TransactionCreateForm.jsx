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
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import { Transaction, Category as Category0, Account } from "../models";
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
export default function TransactionCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    date: "",
    description: "",
    amount: "",
    accountID: undefined,
    Category: undefined,
  };
  const [date, setDate] = React.useState(initialValues.date);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [accountID, setAccountID] = React.useState(initialValues.accountID);
  const [Category, setCategory] = React.useState(initialValues.Category);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setDate(initialValues.date);
    setDescription(initialValues.description);
    setAmount(initialValues.amount);
    setAccountID(initialValues.accountID);
    setCurrentAccountIDValue(undefined);
    setCurrentAccountIDDisplayValue("");
    setCategory(initialValues.Category);
    setCurrentCategoryValue(undefined);
    setCurrentCategoryDisplayValue("");
    setErrors({});
  };
  const [currentAccountIDDisplayValue, setCurrentAccountIDDisplayValue] =
    React.useState("");
  const [currentAccountIDValue, setCurrentAccountIDValue] =
    React.useState(undefined);
  const accountIDRef = React.createRef();
  const [currentCategoryDisplayValue, setCurrentCategoryDisplayValue] =
    React.useState("");
  const [currentCategoryValue, setCurrentCategoryValue] =
    React.useState(undefined);
  const CategoryRef = React.createRef();
  const getIDValue = {
    Category: (r) => JSON.stringify({ id: r?.id }),
  };
  const CategoryIdSet = new Set(
    Array.isArray(Category)
      ? Category.map((r) => getIDValue.Category?.(r))
      : getIDValue.Category?.(Category)
  );
  const accountRecords = useDataStoreBinding({
    type: "collection",
    model: Account,
  }).items;
  const categoryRecords = useDataStoreBinding({
    type: "collection",
    model: Category0,
  }).items;
  const getDisplayValue = {
    accountID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Category: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    date: [{ type: "Required" }],
    description: [{ type: "Required" }],
    amount: [{ type: "Required" }],
    accountID: [{ type: "Required" }],
    Category: [],
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
          date,
          description,
          amount,
          accountID,
          Category,
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
          await DataStore.save(new Transaction(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "TransactionCreateForm")}
      {...rest}
    >
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date: value,
              description,
              amount,
              accountID,
              Category,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              date,
              description: value,
              amount,
              accountID,
              Category,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              date,
              description,
              amount: value,
              accountID,
              Category,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              date,
              description,
              amount,
              accountID: value,
              Category,
            };
            const result = onChange(modelFields);
            value = result?.accountID ?? value;
          }
          setAccountID(value);
          setCurrentAccountIDValue(undefined);
        }}
        currentFieldValue={currentAccountIDValue}
        label={"Account id"}
        items={accountID ? [accountID] : []}
        hasError={errors?.accountID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("accountID", currentAccountIDValue)
        }
        errorMessage={errors?.accountID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.accountID(
                accountRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentAccountIDDisplayValue(
            value
              ? getDisplayValue.accountID(
                  accountRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentAccountIDValue(value);
        }}
        inputFieldRef={accountIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Account id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Account"
          value={currentAccountIDDisplayValue}
          options={accountRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.accountID?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentAccountIDValue(id);
            setCurrentAccountIDDisplayValue(label);
            runValidationTasks("accountID", label);
          }}
          onClear={() => {
            setCurrentAccountIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.accountID?.hasError) {
              runValidationTasks("accountID", value);
            }
            setCurrentAccountIDDisplayValue(value);
            setCurrentAccountIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("accountID", currentAccountIDValue)}
          errorMessage={errors.accountID?.errorMessage}
          hasError={errors.accountID?.hasError}
          ref={accountIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "accountID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              date,
              description,
              amount,
              accountID,
              Category: value,
            };
            const result = onChange(modelFields);
            value = result?.Category ?? value;
          }
          setCategory(value);
          setCurrentCategoryValue(undefined);
          setCurrentCategoryDisplayValue("");
        }}
        currentFieldValue={currentCategoryValue}
        label={"Category"}
        items={Category ? [Category] : []}
        hasError={errors?.Category?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Category", currentCategoryValue)
        }
        errorMessage={errors?.Category?.errorMessage}
        getBadgeText={getDisplayValue.Category}
        setFieldValue={(model) => {
          setCurrentCategoryDisplayValue(
            model ? getDisplayValue.Category(model) : ""
          );
          setCurrentCategoryValue(model);
        }}
        inputFieldRef={CategoryRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Category"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Category"
          value={currentCategoryDisplayValue}
          options={categoryRecords
            .filter((r) => !CategoryIdSet.has(getIDValue.Category?.(r)))
            .map((r) => ({
              id: getIDValue.Category?.(r),
              label: getDisplayValue.Category?.(r),
            }))}
          onSelect={({ id, label }) => {
            setCurrentCategoryValue(
              categoryRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentCategoryDisplayValue(label);
            runValidationTasks("Category", label);
          }}
          onClear={() => {
            setCurrentCategoryDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Category?.hasError) {
              runValidationTasks("Category", value);
            }
            setCurrentCategoryDisplayValue(value);
            setCurrentCategoryValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Category", currentCategoryDisplayValue)
          }
          errorMessage={errors.Category?.errorMessage}
          hasError={errors.Category?.hasError}
          ref={CategoryRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Category")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
