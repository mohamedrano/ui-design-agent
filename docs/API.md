# API Documentation

## Overview

This document provides an overview of the API endpoints available in the UI Design Agent project. The API is designed to facilitate various functionalities related to design analysis, A/B testing, accessibility checks, and more.

## Base URL

The base URL for all API endpoints is:

```
/api
```

## Endpoints

### AI Endpoints

#### Analyze

- **Endpoint:** `/ai/analyze`
- **Method:** POST
- **Description:** Analyzes the provided data using AI algorithms.
- **Request Body:**
  - `data`: The data to be analyzed.
- **Response:**
  - `result`: The analysis result.

#### Generate

- **Endpoint:** `/ai/generate`
- **Method:** POST
- **Description:** Generates data based on the provided parameters.
- **Request Body:**
  - `parameters`: The parameters for data generation.
- **Response:**
  - `result`: The generated data.

#### Chat

- **Endpoint:** `/ai/chat`
- **Method:** POST
- **Description:** Facilitates chat functionality using AI.
- **Request Body:**
  - `message`: The message to be processed.
- **Response:**
  - `response`: The AI-generated response.

### Repository Endpoints

#### Audit

- **Endpoint:** `/repo/audit`
- **Method:** GET
- **Description:** Audits the codebase for issues.
- **Response:**
  - `auditReport`: The results of the audit.

### Refactor Endpoints

#### Tailwind

- **Endpoint:** `/refactor/tailwind`
- **Method:** POST
- **Description:** Refactors CSS to Tailwind CSS.
- **Request Body:**
  - `css`: The CSS code to be refactored.
- **Response:**
  - `tailwindCss`: The refactored Tailwind CSS code.

### Visual Difference Endpoints

#### Run

- **Endpoint:** `/visual-diff`
- **Method:** POST
- **Description:** Runs visual difference tests.
- **Request Body:**
  - `images`: The images to compare.
- **Response:**
  - `diffReport`: The results of the visual difference test.

### Accessibility Endpoints

#### Check

- **Endpoint:** `/accessibility`
- **Method:** POST
- **Description:** Checks the provided content for accessibility issues.
- **Request Body:**
  - `content`: The content to be checked.
- **Response:**
  - `issues`: The identified accessibility issues.

### Performance Endpoints

#### Lighthouse

- **Endpoint:** `/performance`
- **Method:** GET
- **Description:** Retrieves performance metrics using Lighthouse.
- **Response:**
  - `performanceMetrics`: The performance metrics report.

### Design Tokens Endpoints

#### Manage

- **Endpoint:** `/design-tokens`
- **Method:** GET/POST
- **Description:** Manages design tokens.
- **Response:**
  - `tokens`: The list of design tokens.

### Webhook Endpoints

#### Handle

- **Endpoint:** `/webhook`
- **Method:** POST
- **Description:** Handles incoming webhooks.
- **Request Body:**
  - `payload`: The webhook payload.
- **Response:**
  - `status`: The status of the webhook handling.

## Conclusion

This API documentation provides a comprehensive overview of the available endpoints and their functionalities. For further details on request and response formats, please refer to the specific endpoint documentation.