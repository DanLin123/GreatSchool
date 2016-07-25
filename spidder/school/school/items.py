# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy.item import Item, Field


class SchoolItem(Item):
	logo = Field()
	name = Field()
	province = Field()
	city = Field()
	area = Field()
	address = Field()
	level = Field()
	catagery = Field()
	schoolType = Field()
	phone = Field()
	schoolIntroduction = Field()
	score = Field()
	