const Joi = require('joi');

const argvSchema = Joi.object().keys({
  interval: Joi.number().required().default(5),
  protocol: Joi.string().valid('udp').optional(),
  host: Joi.when('protocol', {
    is: 'udp',
    then: Joi.string().required().default('127.0.0.1'),
    otherwise: Joi.forbidden(),
  }),
  port: Joi.when('protocol', {
    is: 'udp',
    then: Joi.number().required().min(0).max(65535),
    otherwise: Joi.forbidden(),
  }),
  output: Joi.string().optional().default('/tmp'),
  fileType: Joi.string().optional().default('txt'),
  trace: Joi.boolean().optional().default(false),
  help: Joi.boolean().required().default(false),
});

/**
 * 检查参数, 如果参数不合规则退出
 * @param {any} flags - 参数列表
 * @returns 
 */
module.exports = async function (flags) {
  let result;
  try {
    result = await argvSchema.validateAsync(flags);
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
  return result;
};