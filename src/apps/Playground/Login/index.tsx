import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, Input, Screen} from '../../../components';
import {useColor} from '../../../hooks';
import {config} from '../../../utils';

export const Login = memo(function Login() {
  const {goBack} = useNavigation();
  const color = useColor();

  const [form, setForm] = useState({
    email: '',
    error: '',
    name: '',
    password: '',
  });

  const handleChange = useCallback(
    (key: string) => (val: string) => {
      setForm(prev => ({...prev, [key]: val}));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setForm(prev => ({...prev, error: 'Invalid Email'}));
  }, []);
  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Login">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{backgroundColor: color.surface, padding: config.padding(4)}}>
        <Input
          error={form.error}
          onChangeText={handleChange('name')}
          optional
          placeholder="jane doe"
          title="Name"
          value={form.name}
        />
        <Input
          error={form.error}
          keyboardType="email-address"
          onChangeText={handleChange('email')}
          placeholder="example@gmail.com"
          textContentType="username"
          title="Email"
          value={form.email}
        />
        <Input
          onChangeText={handleChange('password')}
          placeholder="•••••••"
          secureTextEntry
          textContentType="password"
          title="Password"
          value={form.password}
        />
        <Button
          center
          color="primary"
          emphasis="high"
          onPress={handleSubmit}
          title="complete form"
        />
      </ScrollView>
    </Screen>
  );
});
