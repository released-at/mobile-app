import React, { useState, useCallback } from 'react'
import { useMutation, useQueryCache } from 'react-query'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native'
import { useFormik } from 'formik'
import Button from '../../components/Button'
import { setToken } from '../../features/user/utils'
import { sendConfirmCode, confirm } from '../../shared/api'
import { endpoints } from '../../shared/constants'

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const VALIDATE_ERRORS = {
  EMAIL: 'Некорректный email',
  CODE: 'Код должен содержать 4 символа',
}

const FIELDS = {
  EMAIL: 'email',
  CODE: 'code',
}

const INITIAL_VALUES = {
  email: '',
  code: '',
}

const SignUp: React.FC = () => {
  const queryCache = useQueryCache()
  const [currentField, setCurrentField] = useState(FIELDS.EMAIL)
  const [error, setError] = useState(null)

  const clearError = useCallback(() => {
    if (error) setError(null)
  }, [error])

  const [signIn] = useMutation(confirm, {
    onSuccess: async ({ token, current_user }) => {
      await setToken(token)
      queryCache.setQueryData(endpoints.PROFILE, current_user)
    },
    throwOnError: true,
  })

  const {
    handleSubmit,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validate: values => {
      let errors: { email?: string; code?: string } = {}

      if (currentField === FIELDS.EMAIL && !EMAIL_REGEXP.test(values.email)) {
        errors.email = VALIDATE_ERRORS.EMAIL
      }

      if (currentField === FIELDS.CODE && values.code.length !== 4) {
        errors.code = VALIDATE_ERRORS.CODE
      }

      return errors
    },
    onSubmit: async values => {
      switch (currentField) {
        case FIELDS.EMAIL: {
          try {
            await sendConfirmCode(values.email)
            Keyboard.dismiss()
            clearError()
            setCurrentField(FIELDS.CODE)
          } catch (e) {
            console.error(e)
            setError(e.message)
          } finally {
            break
          }
        }
        case FIELDS.CODE: {
          try {
            await signIn({
              code: values.code,
              email: values.email,
            })
          } catch (e) {
            console.error(e)
            setError(
              e.response.status === 403 ? 'Неверный код' : e.error.message,
            )
          } finally {
            break
          }
        }
      }
    },
  })

  return (
    <SafeAreaView style={styles.safe}>
      {currentField === FIELDS.EMAIL && (
        <View style={styles.container}>
          <Text style={styles.desc}>
            Мы&nbsp;не&nbsp;храним ваши пароли ни&nbsp;в&nbsp;каком виде
            из&nbsp;соображений безопасности. Поэтому для регистрации просто
            введите ваш email, на&nbsp;который придет короткий одноразовый код.
            Введя его, вы&nbsp;попадёте в&nbsp;личный кабинет.
          </Text>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              autoFocus={false}
              multiline={false}
              onSubmitEditing={() => {
                handleSubmit()
              }}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <Button
            onPress={() => {
              handleSubmit()
            }}
          >
            Отправить код
          </Button>
          {error && <Text style={styles.formError}>{error}</Text>}
        </View>
      )}
      {currentField === FIELDS.CODE && (
        <View style={styles.container}>
          <Text style={styles.desc}>
            На&nbsp;почту <Text style={styles.email}>{values.email}</Text> был
            выслан 4-х значный код необходимый для авторизации. Если код
            не&nbsp;пришёл в&nbsp;течение минуты, проверьте введенный email
            адрес, возможно в&nbsp;нём была допущена ошибка. Если email введен
            правильно, а&nbsp;код так и&nbsp;не&nbsp;пришел, то&nbsp;напишите
            нам на&nbsp;почту support@released.at
          </Text>
          <View style={styles.field}>
            <TextInput
              style={styles.input}
              placeholder="Код"
              maxLength={4}
              textContentType="telephoneNumber"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
              autoFocus
              multiline={false}
              onSubmitEditing={() => {
                handleSubmit()
              }}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <Button
            onPress={() => {
              handleSubmit()
            }}
          >
            Войти
          </Button>
          {error && <Text style={styles.formError}>{error}</Text>}
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  desc: {
    marginBottom: 24,
  },
  email: {
    textDecorationLine: 'underline',
  },
  field: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  error: {
    position: 'absolute',
    top: 42,
    left: 16,
    color: 'red',
    fontSize: 12,
  },
  formError: {
    marginTop: 2,
    color: 'red',
    fontSize: 12,
  },
})

export default SignUp
