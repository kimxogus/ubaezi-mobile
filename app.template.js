module.exports = {
  expo: {
    sdkVersion: '22.0.0',
    name: '유배지',
    slug: 'ubaezi',
    privacy: 'unlisted',
    version: '0.4.0',
    scheme: 'ubeazi',
    android: {
      package: 'io.xogus.ubaezi',
      versionCode: '${buildNumber}',
      config: {
        fabric: {},
        googleSignIn: {
          apiKey: '${androidGoogleApiKey}',
          certificateHash: '${androidGoogleCertificateHash}',
        },
      },
    },
    ios: {
      bundleIdentifier: 'io.xogus.ubaezi',
      buildNumber: '${buildNumber}',
      config: {
        googleSignIn: {
          reservedClientId: '${iosReservedClientId}',
        },
      },
    },
    facebookScheme: '${facebookScheme}',
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'ubaezi',
            project: 'ubaezi-react-native',
            authToken: '${sentryAuthToken}',
          },
        },
      ],
    },
  },
};
