
### Key Directories

- **`abis/`**: Contains all contract ABIs and TypeScript interfaces
- **`helpers/`**: Utility functions for RPC calls, file operations, and data processing
- **`scripts/`**: Main scripts for calculating permissions for different Aave versions and networks
- **`statics/`**: JSON configuration files defining which functions require which permissions

## Development Setup

### Available Scripts

- `npm run modifiers:generate` - Generate permissions JSON data
- `npm run tables:create` - Create markdown tables from permissions data

### Development Workflow

1. **Generate permissions data**:
   ```bash
   npm run modifiers:generate
   ```

2. **Create permission tables**:
   ```bash
   npm run tables:create
   ```

3. **Check output**: Generated files will appear in the `out/` directory

## Adding New Networks

### 1. Update Address Book

Ensure the new network is supported in `@aave-dao/aave-address-book` package.

### 2. Update Configuration

Add network-specific configurations to the `helpers/configs.ts` file.

## Submitting Changes

### 1. Create a Feature Branch

```bash
git checkout -b feature/add-new-network
```

### 2. Make Your Changes

- Implement the new functionality
- Update relevant documentation
- Add any new dependencies to `package.json`

### 3. Test Your Changes

- Run the permission generation scripts
- Verify output is correct
- Check for any linting errors

### 4. Commit and Push

```bash
git add .
git commit -m "feat: add support for new network X"
git push origin feature/add-new-network
```

### 5. Create a Pull Request

- Provide a clear description of changes
- Request review from maintainers

### Pull Request Guidelines

- **Title**: Use conventional commit format (e.g., "feat: add new network support")
- **Description**: Clearly explain what the PR does and why
- **Testing**: Describe how you tested the changes
- **Breaking Changes**: Note any breaking changes if applicable

## Questions and Support

### Getting Help

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussions**: Use GitHub discussions for questions and general help
- **Documentation**: Check the README and existing code for examples

### Community Guidelines

- Be respectful and constructive
- Help others when possible
- Follow the project's code of conduct
- Provide clear, actionable feedback

## License

By contributing to this project, you agree that your contributions will be licensed under the same [LICENSE](./LICENSE) as the project (MIT License).

---

Thank you for contributing to the Aave Permissions Book! Your contributions help make the Aave ecosystem more transparent and accessible to everyone.