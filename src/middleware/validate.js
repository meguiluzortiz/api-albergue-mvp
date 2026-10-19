function validate(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.') || 'body',
        message: issue.message
      }));

      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Datos inválidos',
        issues
      });
    }

    req.body = parsed.data;
    next();
  };
}

module.exports = { validate };
