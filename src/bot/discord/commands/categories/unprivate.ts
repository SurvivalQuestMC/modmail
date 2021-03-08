import { RoleLevel } from '@newcircuit/modmail-types';
import { CommandoClient, CommandoMessage } from 'discord.js-commando';
import { PermsUtil } from '../../../util';
import { Command } from '../../';
import ModmailBot from '../../../bot';


export default class Unprivate extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'unprivate',
      aliases: [],
      description: 'Make a category not private',
      guildOnly: true,
      group: 'category',
      memberName: 'unprivate',
      args: [],
    });
  }

  @PermsUtil.Requires(RoleLevel.Admin)
  public async run(msg: CommandoMessage): Promise<null> {
    const modmail = ModmailBot.getModmail();
    const category = await modmail.categories.getByGuild(msg.guild?.id || '');

    if (category === null) {
      await msg.say('This isn\'t a category');
      return null;
    }

    await category.setPrivate(false);
    await msg.say('Made this category not private.');
    return null;
  }
}
